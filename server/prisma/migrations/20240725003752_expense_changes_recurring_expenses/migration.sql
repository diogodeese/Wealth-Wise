/*
  Warnings:

  - You are about to drop the column `currency` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `receipt` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Expense` DROP COLUMN `currency`,
    DROP COLUMN `location`,
    DROP COLUMN `receipt`,
    DROP COLUMN `updatedAt`;

-- CreateTable
CREATE TABLE `RecurringExpense` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `recurrenceDay` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecurringExpense` ADD CONSTRAINT `RecurringExpense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecurringExpense` ADD CONSTRAINT `RecurringExpense_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ExpenseCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
