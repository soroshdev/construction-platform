-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectName" VARCHAR(100) NOT NULL,
    "usageType" TEXT NOT NULL,
    "totalFloor" INTEGER NOT NULL,
    "unitAreasFrom" DOUBLE PRECISION NOT NULL,
    "unitAreasTo" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "parcelId" INTEGER NOT NULL,
    "totalLandArea" DOUBLE PRECISION NOT NULL,
    "projectStructure" TEXT NOT NULL,
    "projectStructureDetail" TEXT NOT NULL,
    "landscape" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
