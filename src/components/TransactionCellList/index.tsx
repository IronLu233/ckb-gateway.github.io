import { FC } from "react";
import { BI } from "@ckb-lumos/bi";
import { encodeToAddress } from "@ckb-lumos/helpers";
import { Cell } from "@ckb-lumos/lumos";
import { number } from "@ckb-lumos/codec";
import { getConfig } from "@ckb-lumos/config-manager";
import { getLockScriptName, getTypeScriptName } from "../../utils";

type TransactionCellListProps = {
  type: "inputs" | "outputs";
  cells: Cell[];
};

export const TransactionCellList: FC<TransactionCellListProps> = ({
  cells,
  type,
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 shadow-sm rounded-xl p-8">
      <div className="grid grid-cols-3 gap-y-4 text-base">
        <>
          <div className="text-center text-lg font-semibold">Cell {type}</div>
          <div className="text-lg font-semibold">Details</div>
          <div className="text-lg font-semibold">Amount</div>
        </>

        {cells.map((cell) => (
          <>
            <div className="text-ellipsis overflow-hidden w-120">
              {encodeToAddress(cell.cellOutput.lock)}

              <div className=" border border-lime-500 rounded-md px-2 inline-flex text-sm text-lime-500">
                {getLockScriptName(cell.cellOutput.lock)}
              </div>
            </div>
            <div>{getTypeScriptName(cell.cellOutput.type)}</div>
            {cell.cellOutput.type?.codeHash ===
            getConfig().SCRIPTS.SUDT?.CODE_HASH ? (
              <div>{number.Uint128LE.unpack(cell.data).toNumber()} sUDT</div>
            ) : (
              <div>
                {BI.from(cell.cellOutput.capacity).toNumber() / 1e8} CKB
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
