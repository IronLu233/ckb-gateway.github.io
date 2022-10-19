import { FC } from "react";
import { BI } from "@ckb-lumos/bi";
import { encodeToAddress } from "@ckb-lumos/helpers";
import { Cell } from "@ckb-lumos/lumos";
import { getTypeScriptName } from "../../utils";

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
            </div>
            <div>{getTypeScriptName(cell.cellOutput.type)}</div>
            <div>{BI.from(cell.cellOutput.capacity).toNumber() / 1e8} CKB</div>
          </>
        ))}
      </div>
    </div>
  );
};
