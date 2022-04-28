-- CreateTable
CREATE TABLE "cache" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cache_userid_key" ON "cache"("userid");

-- AddForeignKey
ALTER TABLE "cache" ADD CONSTRAINT "cache_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
