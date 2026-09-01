export type SocialCardImageKey =
  | "homepage"
  | "default"
  | "workflow"
  | "learning"
  | "bitcoinCore"
  | "longRoad"
  | "walletGuide"
  | "bip39"
  | "multisig"
  | "support"
  | "startHere"

declare const __SOCIAL_CARD_URLS__: Record<SocialCardImageKey, string>

export const SOCIAL_CARD_IMAGES = __SOCIAL_CARD_URLS__
