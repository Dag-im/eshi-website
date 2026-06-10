import { MigrationInterface, QueryRunner } from 'typeorm';

export class ApproachMethodologyServiceCardWhyChoose1712400000000 implements MigrationInterface {
  name = 'ApproachMethodologyServiceCardWhyChoose1712400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE approaches (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(100) NULL,
        sortOrder INT NOT NULL DEFAULT 0,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX IDX_approaches_sort (sortOrder),
        PRIMARY KEY (id)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE methodology_phases (
        id INT NOT NULL AUTO_INCREMENT,
        phase VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        items JSON NULL,
        sortOrder INT NOT NULL DEFAULT 0,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX IDX_methodology_phases_sort (sortOrder),
        PRIMARY KEY (id)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE service_cards (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        points JSON NOT NULL,
        sortOrder INT NOT NULL DEFAULT 0,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX IDX_service_cards_sort (sortOrder),
        PRIMARY KEY (id)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE why_choose_reasons (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(100) NULL,
        sortOrder INT NOT NULL DEFAULT 0,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX IDX_why_choose_reasons_sort (sortOrder),
        PRIMARY KEY (id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE why_choose_reasons');
    await queryRunner.query('DROP TABLE service_cards');
    await queryRunner.query('DROP TABLE methodology_phases');
    await queryRunner.query('DROP TABLE approaches');
  }
}
