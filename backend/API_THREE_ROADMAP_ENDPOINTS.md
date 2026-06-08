# 3 APIs for Roadmap Management

## Database Schema Overview

Cấu trúc dữ liệu:
```
Roadmap (1) ──────────► (N) Stage ──────────► (N) Step ──────────► (N) Resource
   id                      id                  id                   id
   title                   title               title                title
   description             description         orderIndex           type
   difficultyLevel         orderIndex          estimatedMinutes     url
   estimatedHours          roadmapId           stageId              stepId
   categoryId              
   isPublished             

Step ──────────► (1) StepContent
  id                id
  title             bodyMarkdown
  orderIndex        stepId (unique)
```

---

## API 1: Get Roadmap Detail by ID

### Endpoint
```
GET /api/roadmaps/:id
```

### Description
Lấy chi tiết đầy đủ của một roadmap bao gồm tất cả stages, steps, content và resources.

### Parameters
| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| id | string | URL path | Yes | UUID của roadmap |

### Success Response (200)
```json
{
  "id": "bf5d655c-24a1-425a-be86-5c151c73e533",
  "author": "System",
  "authorAvatar": "S",
  "title": "ML Engineer Roadmap",
  "tags": ["Data & AI"],
  "duration": "60 days",
  "level": "intermediate",
  "description": "A comprehensive learning path...",
  "views": 0,
  "likes": 0,
  "steps": [
    {
      "id": "step-1",
      "title": "Introduction",
      "description": "Giai đoạn: Stage 1: Programming Foundations",
      "content": "Machine learning is...",
      "resources": [
        "VIDEO: Course - https://...",
        "DOCS: Guide - https://..."
      ],
      "howTo": ["Learn", "Practice", "Review"],
      "rule": "Study regularly"
    }
  ],
  "stages": [
    {
      "id": "stage-1",
      "title": "Stage 1: Programming Foundations",
      "orderIndex": 1,
      "steps": [...]
    }
  ]
}
```

### Error Responses

**404 Not Found**
```json
{
  "success": false,
  "message": "Không tìm thấy lộ trình học tập"
}
```

**400 Bad Request**
```json
{
  "success": false,
  "message": "ID lộ trình là bắt buộc"
}
```

### Example
```bash
curl -X GET http://localhost:3000/api/roadmaps/bf5d655c-24a1-425a-be86-5c151c73e533
```

### Frontend Usage
```typescript
const roadmap = await getRoadmapById("bf5d655c-24a1-425a-be86-5c151c73e533");
console.log(roadmap.title);        // "ML Engineer Roadmap"
console.log(roadmap.steps.length); // 5
```

---

## API 2: Get Stages by Roadmap ID

### Endpoint
```
GET /api/roadmaps/:roadmapId/stages
```

### Description
Lấy danh sách tất cả stages (giai đoạn) của một roadmap, sắp xếp theo thứ tự.

### Parameters
| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| roadmapId | string | URL path | Yes | UUID của roadmap |

### Success Response (200)
```json
{
  "success": true,
  "roadmapId": "bf5d655c-24a1-425a-be86-5c151c73e533",
  "roadmapTitle": "ML Engineer Roadmap",
  "stagesCount": 2,
  "stages": [
    {
      "id": "stage-1",
      "roadmapId": "bf5d655c-24a1-425a-be86-5c151c73e533",
      "title": "Stage 1: Programming Foundations",
      "description": "Learn Python and basics",
      "orderIndex": 1,
      "stepsCount": 2
    },
    {
      "id": "stage-2",
      "roadmapId": "bf5d655c-24a1-425a-be86-5c151c73e533",
      "title": "Stage 2: Machine Learning Core",
      "description": "Study ML algorithms",
      "orderIndex": 2,
      "stepsCount": 3
    }
  ]
}
```

### Error Responses

**404 Not Found** - Roadmap không tồn tại
```json
{
  "success": false,
  "message": "Không tìm thấy lộ trình học tập"
}
```

**400 Bad Request** - Thiếu roadmapId
```json
{
  "success": false,
  "message": "ID lộ trình là bắt buộc"
}
```

### Example
```bash
curl -X GET http://localhost:3000/api/roadmaps/bf5d655c-24a1-425a-be86-5c151c73e533/stages
```

### Frontend Usage
```typescript
const stages = await getStagesByRoadmapId("bf5d655c-24a1-425a-be86-5c151c73e533");
stages.forEach(stage => {
  console.log(stage.title);       // "Stage 1: Programming Foundations"
  console.log(stage.stepsCount);  // 2
});
```

---

## API 3: Get Steps by Stage ID

### Endpoint
```
GET /api/roadmaps/stages/:stageId/steps
```

### Description
Lấy danh sách tất cả steps (bước học) của một stage, bao gồm content và resources, sắp xếp theo thứ tự.

### Parameters
| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| stageId | string | URL path | Yes | UUID của stage |

### Success Response (200)
```json
{
  "success": true,
  "stageId": "stage-1",
  "stageTitle": "Stage 1: Programming Foundations",
  "stepsCount": 2,
  "steps": [
    {
      "id": "step-1",
      "stageId": "stage-1",
      "title": "Introduction",
      "orderIndex": 1,
      "estimatedMinutes": 60,
      "content": "Machine learning is a subset of artificial intelligence...",
      "resourcesCount": 4,
      "resources": [
        {
          "id": "res-1",
          "type": "video",
          "title": "Andrew Ng's Machine Learning Course on Coursera",
          "url": "https://www.coursera.org/learn/machine-learning",
          "orderIndex": 1
        },
        {
          "id": "res-2",
          "type": "docs",
          "title": "Google Machine Learning Crash Course",
          "url": "https://developers.google.com/machine-learning/crash-course",
          "orderIndex": 2
        }
      ]
    },
    {
      "id": "step-2",
      "stageId": "stage-1",
      "title": "Python Basics",
      "orderIndex": 2,
      "estimatedMinutes": 120,
      "content": "Python is a high-level, interpreted language...",
      "resourcesCount": 3,
      "resources": [...]
    }
  ]
}
```

### Error Responses

**404 Not Found** - Stage không tồn tại
```json
{
  "success": false,
  "message": "Không tìm thấy giai đoạn học tập"
}
```

**400 Bad Request** - Thiếu stageId
```json
{
  "success": false,
  "message": "ID giai đoạn là bắt buộc"
}
```

### Example
```bash
curl -X GET http://localhost:3000/api/roadmaps/stages/stage-1/steps
```

### Frontend Usage
```typescript
const steps = await getStepsByStageId("stage-1");
steps.forEach(step => {
  console.log(step.title);              // "Introduction"
  console.log(step.estimatedMinutes);   // 60
  step.resources.forEach(res => {
    console.log(`${res.type}: ${res.title}`);
  });
});
```

---

## Implementation Details

### Controllers (roadmap.controller.ts)

```typescript
// API 1: Get Roadmap by ID
export const getRoadmapById = async (req: Request, res: Response) => {
  // Lấy ID từ URL params
  // Kiểm tra ID không rỗng
  // Query Prisma với include stages, steps, content, resources
  // Format lại dữ liệu cho frontend
  // Trả về response
}

// API 2: Get Stages by Roadmap ID
export const getStagesByRoadmapId = async (req: Request, res: Response) => {
  // Lấy roadmapId từ URL params
  // Kiểm tra roadmap tồn tại
  // Query tất cả stages, sắp xếp theo orderIndex
  // Format response
  // Trả về danh sách stages
}

// API 3: Get Steps by Stage ID
export const getStepsByStageId = async (req: Request, res: Response) => {
  // Lấy stageId từ URL params
  // Kiểm tra stage tồn tại
  // Query tất cả steps, sắp xếp theo orderIndex
  // Include content và resources
  // Format response
  // Trả về danh sách steps
}
```

### Routes (roadmap.routes.ts)

```typescript
import { 
  getAllRoadmaps, 
  getRoadmapById, 
  getStagesByRoadmapId, 
  getStepsByStageId 
} from "@/controllers/roadmap.controller.js";

roadmapRouter.get("/:id", getRoadmapById);
roadmapRouter.get("/:roadmapId/stages", getStagesByRoadmapId);
roadmapRouter.get("/stages/:stageId/steps", getStepsByStageId);
```

---

## API Usage Flow

### Scenario 1: Browse a Roadmap
```
1. Call getAllRoadmaps() → Get list of roadmaps
   ↓
2. User clicks roadmap → Call getRoadmapById(id) → Display full detail
```

### Scenario 2: View Stages
```
1. Call getStagesByRoadmapId(roadmapId) → Get stages list
   ↓
2. Display stages vertically/horizontally
```

### Scenario 3: View Steps in a Stage
```
1. Call getStepsByStageId(stageId) → Get steps list
   ↓
2. Display steps with resources
   ↓
3. User can access resources and content
```

### Scenario 4: Full Deep Dive
```
1. getRoadmapById(id) 
   ↓ (contains full hierarchy)
2. Display all stages and steps at once
   ↓
3. Or call individually:
   - getStagesByRoadmapId(id) → stages list
   - getStepsByStageId(stageId) → steps with resources
```

---

## Error Handling

### Common Error Cases

| Case | HTTP | Message | Solution |
|------|------|---------|----------|
| Invalid UUID format | 400 | "ID lộ trình là bắt buộc" | Validate UUID format |
| Roadmap not found | 404 | "Không tìm thấy lộ trình học tập" | Check roadmap ID |
| Stage not found | 404 | "Không tìm thấy giai đoạn học tập" | Check stage ID |
| Database error | 500 | "Lỗi hệ thống" | Check database connection |

---

## Performance Optimization

### Database Queries
- Stages lấy orderBy để sắp xếp
- Steps lấy cùng với content và resources
- Include only necessary fields

### Response Size
- API 2 (stages): Nhẹ, chỉ metadata
- API 3 (steps): Nặng hơn, chứa content và resources
- API 1 (detail): Rất nặng, toàn bộ dữ liệu

### Caching Strategy
```typescript
// Có thể cache kết quả trong Redis
const cacheKey = `roadmap:${id}`;
const cached = await redis.get(cacheKey);
if (cached) return cached;

// Nếu không có cache, query database
const data = await prisma.roadmap.findUnique(...);
await redis.set(cacheKey, data, 3600); // Cache 1 hour
return data;
```

---

## Testing

Run test file:
```bash
npm run dev  # Start server in another terminal
npx tsx test-three-apis.ts
```

Expected output:
```
🚀 Testing 3 APIs for Roadmap Management

✅ TEST 1: GET /api/roadmaps/:id
   Title: ML Engineer Roadmap
   Steps count: 5

✅ TEST 2: GET /api/roadmaps/:roadmapId/stages
   Stages count: 2
   1. Stage 1: Programming Foundations
   2. Stage 2: Machine Learning Core

✅ TEST 3: GET /api/roadmaps/stages/:stageId/steps
   Steps count: 2
   1. Introduction (60 minutes)
   2. Python Basics (120 minutes)

✅ ALL TESTS PASSED SUCCESSFULLY!
```
