-- CreateTable
CREATE TABLE "attributes" (
    "id" TEXT NOT NULL,
    "category_id" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "value" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "attributes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
