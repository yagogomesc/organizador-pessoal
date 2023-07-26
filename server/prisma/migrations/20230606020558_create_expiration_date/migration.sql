-- CreateTable
CREATE TABLE "ExpirationDate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "notify" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ExpirationDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpirationDate" ADD CONSTRAINT "ExpirationDate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
