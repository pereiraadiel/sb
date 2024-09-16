import { create } from "zustand";

type useRole = {
  role: "barraquinha" | "caixa";
  setRole: (role: "barraquinha" | "caixa") => void;
};

const useRole = create<useRole>((set) => {
  return {
    role: "caixa",
    setRole: (role: "barraquinha" | "caixa") => set({ role }),
  };
});

export default useRole;
