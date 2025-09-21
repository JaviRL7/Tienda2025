"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { useCart } from "react-use-cart";

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    isEmpty,
    totalUniqueItems: count,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay animado */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 flex z-50">
          {/* Panel animado */}
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="ml-auto relative w-[350px] max-w-full h-full bg-white shadow-xl p-6 flex flex-col">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>

              <Dialog.Title className="text-lg font-medium text-gray-900">
                Carrito ({count})
              </Dialog.Title>

              <div className="mt-6 flex-1 overflow-y-auto">
                {isEmpty ? (
                  <p className="text-center text-gray-500">
                    El carrito está vacío
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center border-b py-4 last:border-none"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-gray-600">
                          €{item.price.toFixed(2)}
                        </p>
                        <div className="mt-2 flex gap-2 items-center">
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                (item.quantity ?? 1) - 1
                              )
                            }
                            className="px-2 py-0.5 border rounded"
                          >
                            −
                          </button>
                          <span>{item.quantity ?? 1}</span>
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                (item.quantity ?? 1) + 1
                              )
                            }
                            className="px-2 py-0.5 border rounded"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-red-500 hover:underline text-sm"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {!isEmpty && (
                <div className="mt-4">
                  <p className="font-semibold">
                    Total: €{cartTotal.toFixed(2)}
                  </p>
                  <button
                    onClick={() => emptyCart()}
                    className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Vaciar carrito
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
