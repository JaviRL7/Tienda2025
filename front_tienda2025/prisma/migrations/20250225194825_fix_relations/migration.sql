/*
  Warnings:

  - You are about to drop the column `subcategoria` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `categoria_id` on the `productos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "productos" DROP CONSTRAINT "productos_categoria_id_fkey";

-- AlterTable
ALTER TABLE "categoria" DROP COLUMN "subcategoria",
ADD COLUMN     "descripcion" TEXT;

-- AlterTable
ALTER TABLE "productos" DROP COLUMN "categoria_id",
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "subcategoriaId" INTEGER;

-- CreateTable
CREATE TABLE "subcategoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "subcategoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subcategoria" ADD CONSTRAINT "subcategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_subcategoriaId_fkey" FOREIGN KEY ("subcategoriaId") REFERENCES "subcategoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
