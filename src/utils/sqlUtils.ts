import * as cardRepository from "../repositories/cardRepository.js";

export function mapObjectToUpdateQuery({ object, offset = 1 }) {
  const objectColumns = Object.keys(object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(",");
  const objectValues = Object.values(object);

  return { objectColumns, objectValues };
}
export async function verifyExistingCard(card: cardRepository.Card) {
  if (!card) {
    throw { type: "unauthorized", message: "inexistent card" };
  }
}
