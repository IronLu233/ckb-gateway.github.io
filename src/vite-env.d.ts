/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LUMOS_CONFIG_NAME: "LINA" | "AGGRON4";
  readonly VITE_RPC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
