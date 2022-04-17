import { verifyExistingCard } from "../utils/sqlUtils.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function pay({ cardId, password, businessId, amount }) {
  const card = await cardRepository.findById(cardId);
  await verifyExistingCard(card);
  await verifyExpirationDate(card.expirationDate);
  await verifyCorrectPassword(password, card.password);
  await verifyCardBusinessType(businessId, card);
  await verifyEvenAmount(cardId, amount);
  paymentRepository.insert({ cardId, businessId, amount });
}
async function calculateBalance({ transactions, recharges }) {
  let paymentTotal = 0;
  let rechargeTotal = 0;
  await transactions.forEach(({ amount }) => {
    paymentTotal += Number(amount);
  });

  await recharges.forEach(({ amount }) => {
    rechargeTotal += Number(amount);
  });
  return rechargeTotal - paymentTotal;
}
export async function getBalance(cardId: number) {
  const transactions = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);
  const balance = await calculateBalance({ transactions, recharges });

  return balance;
}
async function verifyEvenAmount(cardId: number, amount: number) {
  const balance = await getBalance(cardId);
  if (balance < amount) {
    throw { type: "unauthorized", message: "insufifficient balance" };
  }
}
async function verifyCardBusinessType(
  businessId: number,
  card: cardRepository.Card
) {
  const { type } = await businessRepository.findById(businessId);
  if (type !== card.type) {
    throw { type: "unauthorized", message: "wrong card type " };
  }
}
async function verifyCorrectPassword(password: string, cardPassword: string) {
  const isCorrect = bcrypt.compareSync(password, cardPassword);
  if (!isCorrect) {
    throw { type: "unauthorized", message: "password is wrong" };
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
