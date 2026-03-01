import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  productId: string
  qty: number
  name: string
  price: number
  imageUrl: string | null
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void
  removeItem: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clear: () => void
  totalItems: () => number
  totalAmount: () => number
  getItemsForCheckout: () => { id: string; qty: number }[]
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const qty = item.qty ?? 1
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          let next: CartItem[]
          if (existing) {
            next = state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, qty: i.qty + qty }
                : i
            )
          } else {
            next = [
              ...state.items,
              {
                productId: item.productId,
                qty,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl ?? null,
              },
            ]
          }
          return { items: next }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }))
      },

      setQty: (productId, qty) => {
        if (qty < 1) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, qty } : i
          ),
        }))
      },

      clear: () => set({ items: [] }),

      totalItems: () => get().items.reduce((acc, i) => acc + i.qty, 0),

      totalAmount: () =>
        get().items.reduce((acc, i) => acc + i.price * i.qty, 0),

      getItemsForCheckout: () =>
        get().items.map((i) => ({ id: i.productId, qty: i.qty })),
    }),
    { name: "industriarlc-cart" }
  )
)
