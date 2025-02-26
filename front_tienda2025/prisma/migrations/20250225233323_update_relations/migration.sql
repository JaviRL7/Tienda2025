/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `subcategoria` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `subcategoria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subcategoriaId` to the `categoria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subcategoria" DROP CONSTRAINT "subcategoria_categoriaId_fkey";

-- AlterTable
ALTER TABLE "categoria" ADD COLUMN     "subcategoriaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subcategoria" DROP COLUMN "categoriaId";

-- CreateIndex
CREATE UNIQUE INDEX "subcategoria_nombre_key" ON "subcategoria"("nombre");

-- AddForeignKey
ALTER TABLE "categoria" ADD CONSTRAINT "categoria_subcategoriaId_fkey" FOREIGN KEY ("subcategoriaId") REFERENCES "subcategoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
