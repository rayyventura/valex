import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

export async function create(
  employeeId: number,
  type: TransactionTypes,
  apiKey: string
) {
  await verifyApiKey(apiKey);
  await verifyExistingEmployee(employeeId);
  await verifyExistingCardType(type, employeeId);
  const cardData = await generateCardData(employeeId, type);
  await cardRepository.insert(cardData);
}
/*- OK Cartões já ativados (com senha cadastrada) não devem poder ser ativados de novo
- O CVC deverá ser recebido e verificado para garantir a segurança da requisição
- OK A senha do cartão deverá ser composta de 4 números
- A senha do cartão deverá ser persistida de forma criptografada por ser um dado sensível */

export async function activate({ cardId, cvc, password }) {
  const card = await cardRepository.findById(cardId);
  await verifyExistingCard(card);
  await verifyExpirationDate(card.expirationDate);
  await verifyPreviousActivation(card.password);
  await verifyCVC(cvc, card.securityCode);
  const hashedPassword = bcrypt.hashSync(password, 10);

  await cardRepository.update(cardId, { password: hashedPassword });
}

async function verifyCVC(cvc: string, securityCode: string) {
  const isValidCVC = bcrypt.compareSync(cvc, securityCode);
  if (!isValidCVC) {
    throw { type: "unauthorized", message: "invalid card information" };
  }
}

async function verifyPreviousActivation(password: string) {
  if (password) {
    throw { type: "invalid_data", message: "card already activated" };
  }
}

async function verifyExpirationDate(expirationDate: string) {
  const isExpired = dayjs(expirationDate).isBefore(
    dayjs(Date.now()).format("MM-YY")
  );
  if (isExpired) {
    throw { type: "invalid_data", message: "card is expired" };
  }
}

async function verifyExistingCard(card: cardRepository.Card) {
  if (!card) {
    throw { type: "unauthorized", message: "inexistent card" };
  }
}
async function verifyApiKey(key: string) {
  const company = await companyRepository.findByApiKey(key);
  if (!company) {
    throw { type: "unauthorized", message: "invalid api key" };
  }
}
async function verifyExistingEmployee(employeeId: number) {
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: "unauthorized", message: "inexistent employee" };
  }
}

async function verifyExistingCardType(
  type: TransactionTypes,
  employeeId: number
) {
  const existingcardType = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (existingcardType) {
    throw { type: "conflict", message: `employee already has a ${type} card` };
  }
}
function generateUniqueCardNumber() {
  return faker.finance.creditCardNumber("mastercard");
}
async function generateCardholderName(employeeId: number) {
  const employee = await employeeRepository.findById(employeeId);
  const name = employee.fullName;
  const names = name.split(" ");
  const meio = new Array();

  for (let i = 1; i < names.length - 1; i++) {
    if (names[i].length >= 3) {
      meio.push(name[i][0]);
    }
  }
  const finalName = [names[0], meio, names[names.length - 1]];

  return finalName.join(" ").toUpperCase();
}
function defineExpirationDate() {
  return dayjs(Date.now()).add(5, "year").format("MM-YY");
}
function generateEncriptedCVC() {
  const CVC = faker.finance.creditCardCVV();

  return bcrypt.hashSync(CVC, 10);
}
async function generateCardData(employeeId: number, type: TransactionTypes) {
  const cardNumber = generateUniqueCardNumber();
  const cardHolderName = await generateCardholderName(employeeId);
  const expirationDate = defineExpirationDate();
  const encryptedCVC = generateEncriptedCVC();
  const cardData = {
    employeeId,
    number: cardNumber,
    cardHolderName,
    securityCode: encryptedCVC,
    expirationDate,
    password: null,
    isVirtual: true,
    originalCardId: null,
    isBlocked: true,
    type,
  };
  return cardData;
}
