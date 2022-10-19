import { entries } from "lodash-es";
import { Script } from "@ckb-lumos/lumos";
import { getConfig, Config } from "@ckb-lumos/config-manager";

const TYPE_SCRIPT_NAME_MAP: Record<
  keyof Config["SCRIPTS"],
  string | undefined
> = {
  DAO: "Nervos DAO",
  SUDT: "simple UDT",
  OMNI_LOCK: "OMNI Lock",
};

export function getTypeScriptName(
  script: Script | undefined
): string | undefined {
  const config = getConfig();
  const [typeScriptName] =
    entries(config.SCRIPTS).find(
      ([k, v]) =>
        v?.HASH_TYPE === "type" &&
        v?.CODE_HASH === script?.codeHash &&
        v?.HASH_TYPE === script?.hashType
    ) || [];

  return (
    (typeScriptName && TYPE_SCRIPT_NAME_MAP[typeScriptName]) || "CKB Capacity"
  );
}
