-- AlterTable
ALTER TABLE `ExpenseCategory` ADD COLUMN `budgetCap` DECIMAL(65, 30) NULL,
    ADD COLUMN `colorCode` VARCHAR(191) NULL,
    ADD COLUMN `essential` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `recurring` BOOLEAN NOT NULL DEFAULT false;
