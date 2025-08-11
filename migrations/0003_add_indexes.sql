-- DropIndex
DROP INDEX "Request_plate_idx";

-- DropIndex
DROP INDEX "Vehicle_plate_idx";

-- CreateIndex
CREATE INDEX "Request_expireAt_plate_idx" ON "Request"("expireAt", "plate");

-- CreateIndex
CREATE INDEX "Vehicle_expireAt_plate_idx" ON "Vehicle"("expireAt", "plate");

