import { entries } from "lodash-es";
import { Script } from "@ckb-lumos/lumos";
import { bytes } from "@ckb-lumos/codec";
import { getConfig, Config } from "@ckb-lumos/config-manager";

const TYPE_SCRIPT_NAME_MAP: Record<
  keyof Config["SCRIPTS"],
  string | undefined
> = {
  DAO: "Nervos DAO",
  SUDT: "simple UDT",
  OMNILOCK: "Omni Lock",
};

const LOCK_SCRIPT_NAME_MAP: Record<
  keyof Config["SCRIPTS"],
  string | undefined
> = {
  SECP256K1_BLAKE160: "Secp256k1 blake160",
  SECP256K1_BLAKE160_MULTISIG: "Secp256k1 blake160 multisig",
  ANYONE_CAN_PAY: "Anyone can pay",
  OMNILOCK: "Omni lock",
};

export function getTypeScriptName(
  script: Script | undefined
): string | undefined {
  const config = getConfig();
  const [typeScriptName] =
    entries(config.SCRIPTS).find(
      ([k, v]) =>
        bytes.equal(v?.CODE_HASH || [], script?.codeHash || []) &&
        v?.HASH_TYPE === script?.hashType
    ) || [];

  return (
    (typeScriptName && TYPE_SCRIPT_NAME_MAP[typeScriptName]) || "CKB Capacity"
  );
}

export function getLockScriptName(
  script: Script | undefined
): string | undefined {
  const config = getConfig();
  console.log(config.SCRIPTS, script);
  const [lockScriptName] =
    entries(config.SCRIPTS).find(
      ([k, v]) =>
        bytes.equal(v?.CODE_HASH || [], script?.codeHash || []) &&
        v?.HASH_TYPE === script?.hashType
    ) || [];

  return lockScriptName && LOCK_SCRIPT_NAME_MAP[lockScriptName];
}
