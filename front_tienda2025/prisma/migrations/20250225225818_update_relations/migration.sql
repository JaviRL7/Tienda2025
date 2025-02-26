/*
  Warnings:

  - You are about to drop the column `subcategoriaId` on the `productos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "productos" DROP CONSTRAINT "productos_subcategoriaId_fkey";

-- AlterTable
ALTER TABLE "productos" DROP COLUMN "subcategoriaId",
ADD COLUMN     "categoriaId" INTEGER;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
