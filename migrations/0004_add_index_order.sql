-- DropIndex
DROP INDEX "User_phone_idx";

-- DropIndex
DROP INDEX "Request_expireAt_plate_idx";

-- DropIndex
DROP INDEX "Vehicle_expireAt_plate_idx";

-- CreateIndex
CREATE INDEX "Request_expireAt_plate_idx" ON "Request"("expireAt" DESC, "plate");

-- CreateIndex
CREATE INDEX "Vehicle_expireAt_plate_idx" ON "Vehicle"("expireAt" DESC, "plate");

