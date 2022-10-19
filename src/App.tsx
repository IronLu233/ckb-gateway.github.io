import { useEffect, useRef } from "react";
import { useSetState } from "react-use";
import {
  WalletGatewayProvider,
  resolveRawTransaction,
  TransactionResolveResult,
} from "ckb-gateway";
import { TransactionCellList } from "./components/TransactionCellList";
import { RawTransaction } from "@ckb-lumos/base";
import { LoadingIcon } from "./components/LoadingIcon";

function App() {
  const [{ transaction, validateSuccess, loading }, setState] = useSetState({
    hasInitError: false,
    validateSuccess: true,
    signingType: "eth_personal_sign",
    loading: false,
    transaction: null as TransactionResolveResult | null,
  });

  const { current: gatewayProvider } = useRef(new WalletGatewayProvider());

  useEffect(() => {
    try {
      gatewayProvider.init();
      setState({ loading: true });
      gatewayProvider.on(
        "ValidateDone",
        async ({ success, rawTransaction, signingType }) => {
          const transaction = await resolveRawTransaction(
            rawTransaction,
            import.meta.env.VITE_RPC_URL
          );
          setState({
            validateSuccess: success,
            signingType,
            transaction,
            loading: false,
          });
        }
      );
    } catch (e) {
      setState({ hasInitError: true });
    }

    return () => {
      gatewayProvider.removeAllListeners();
    };
  }, [gatewayProvider]);

  const signDigest = () => {
    debugger;
    gatewayProvider.requestSignDigest();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="mt-8"></div>
      <TransactionCellList type="inputs" cells={transaction?.inputs || []} />

      <div className="mt-4"></div>

      <TransactionCellList type="outputs" cells={transaction?.outputs || []} />

      <div className="mt-4"></div>
      <div className="bg-slate-50 border border-slate-200 shadow-sm rounded-xl p-8">
        <div className="grid grid-cols-3 gap-y-4 text-base">
          <div>
            <b>Transaction Fee</b>
          </div>
          <div></div>
          <div>{(transaction?.transactionFee.toNumber() || 0) / 1e8}</div>
        </div>
      </div>

      {validateSuccess ? (
        <button
          onClick={signDigest}
          className="float-right transition-all text-white rounded-xl bg-green-500 hover:bg-green-600 px-8 py-4"
        >
          Sign Transaction
        </button>
      ) : (
        <button
          className="float-right transaction-all text-white rounded-xl bg-red-300 px-8 py-4"
          disabled
        >
          Tampered! Can not Sign Transaction
        </button>
      )}
    </div>
  );
}

export default App;
