import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity('Classes')
export class SchoolClass {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор класса' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '10А', description: 'Название класса' })
  @Column({ length: 50 })
  className: string;

  @ApiProperty({ example: 2025, description: 'Учебный год' })
  @Column()
  academicYear: number;

  @ApiProperty({
    example: 3,
    description: 'ID классного руководителя',
    nullable: true,
  })
  @ManyToOne(() => Teacher, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'classTeacherId' })
  classTeacher: Teacher;

  // Используем ленивую загрузку для отношения с учениками:
  @OneToMany(() => Student, (student) => student.schoolClass, { lazy: true })
  students: Promise<Student[]>;

  @ApiProperty({
    type: () => [Subject],
    description: 'Список предметов, изучаемых в классе',
    required: false,
  })
  @ManyToMany(() => Subject, (subject) => subject.classes)
  @JoinTable({
    name: 'ClassSubjects',
    joinColumn: { name: 'classId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'subjectId', referencedColumnName: 'id' },
  })
  subjects: Subject[];
}
