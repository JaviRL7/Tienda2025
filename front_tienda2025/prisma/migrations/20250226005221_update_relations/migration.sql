/*
  Warnings:

  - You are about to drop the column `subcategoriaId` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `codigo_tintanda` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the `subcategoria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipoId` to the `categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_tintada` to the `productos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categoria" DROP CONSTRAINT "categoria_subcategoriaId_fkey";

-- AlterTable
ALTER TABLE "categoria" DROP COLUMN "subcategoriaId",
ADD COLUMN     "tipoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "productos" DROP COLUMN "codigo_tintanda",
ADD COLUMN     "codigo_tintada" TEXT NOT NULL;

-- DropTable
DROP TABLE "subcategoria";

-- CreateTable
CREATE TABLE "tipo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tipo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_nombre_key" ON "tipo"("nombre");

-- AddForeignKey
ALTER TABLE "categoria" ADD CONSTRAINT "categoria_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "tipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
