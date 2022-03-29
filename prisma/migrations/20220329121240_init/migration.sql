-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "Sound" (
    "id_" SERIAL NOT NULL,
    "ref" TEXT NOT NULL,
    "fr" TEXT NOT NULL,
    "bci" TEXT NOT NULL,
    "recorded" BOOLEAN NOT NULL DEFAULT false,
    "isRecording" BOOLEAN NOT NULL DEFAULT false,
    "audioLink" TEXT,
    "UserId_" INTEGER,
    "createdAt_" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sound_pkey" PRIMARY KEY ("id_")
);

-- CreateTable
CREATE TABLE "User" (
    "id_" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "genre" "Genre" NOT NULL,
    "undesiredSounds_" INTEGER[],
    "createdAt_" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_")
);

-- CreateTable
CREATE TABLE "Token_" (
    "id" SERIAL NOT NULL,
    "value" TEXT,
    "pass" TEXT,

    CONSTRAINT "Token__pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log_" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "protocol" TEXT,
    "method" TEXT,
    "hostname" TEXT,
    "path" TEXT,
    "httpVersion" TEXT,
    "statusCode" INTEGER,
    "userIp" TEXT,
    "userReferer" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "Log__pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sound" ADD CONSTRAINT "Sound_UserId__fkey" FOREIGN KEY ("UserId_") REFERENCES "User"("id_") ON DELETE SET NULL ON UPDATE CASCADE;
