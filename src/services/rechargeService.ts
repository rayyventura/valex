import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { verifyExistingCard } from "../utils/sqlUtils.js";

export async function recharge(cardId: number, amount: number) {
  const card = await cardRepository.findById(cardId);
  await verifyExistingCard(card);
  await rechargeRepository.insert({ cardId, amount });
}
