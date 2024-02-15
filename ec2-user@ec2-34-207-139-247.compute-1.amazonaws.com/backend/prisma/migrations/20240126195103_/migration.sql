-- CreateTable
CREATE TABLE "FavouriteRecipe" (
    "id" SERIAL NOT NULL,
    "recipeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavouriteRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavouriteRecipe_recipeId_key" ON "FavouriteRecipe"("recipeId");
