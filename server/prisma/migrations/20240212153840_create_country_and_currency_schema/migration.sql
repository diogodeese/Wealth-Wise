-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Country_code_key`(`code`),
    UNIQUE INDEX `Country_name_key`(`name`),
    UNIQUE INDEX `Country_code_name_key`(`code`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CountryToCurrency` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CountryToCurrency_AB_unique`(`A`, `B`),
    INDEX `_CountryToCurrency_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CountryToCurrency` ADD CONSTRAINT `_CountryToCurrency_A_fkey` FOREIGN KEY (`A`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryToCurrency` ADD CONSTRAINT `_CountryToCurrency_B_fkey` FOREIGN KEY (`B`) REFERENCES `Currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
