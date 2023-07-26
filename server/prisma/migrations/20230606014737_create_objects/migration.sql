-- CreateTable
CREATE TABLE "Objects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Objects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Objects" ADD CONSTRAINT "Objects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
