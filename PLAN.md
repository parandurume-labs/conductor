# Execution Plan

> Project: 파란두루미 마케팅 Skill 제작
> Created: 2026-03-26
> Skill: /conductor

## Team

| Role | Pool | Responsibility |
|---|---|---|
| Strategist | Business | 채널별 마케팅 전략, 경쟁사 포지셔닝, 콘텐츠 캘린더 설계 |
| Writer | Content | 각 채널별 콘텐츠 초안 작성 |
| Visual Designer | Content | 카드뉴스 레이아웃, 썸네일 가이드, 비주얼 스타일 정의 |
| Editor | Content | 톤 일관성 검수, 맞춤법, 채널별 포맷 최적화 |
| Architect | Software | skill 구조 설계 |
| QA Engineer | Software | skill 동작 검증, 결과물 품질 테스트 |

## Workstream Dependencies

```
#1 전략 수립 ──────────────────┐
#2 Skill 구조 설계 ────────────┤
                               ▼
            ┌──── #3 콘텐츠 템플릿 제작
            ├──── #4 채널별 가이드 제작
            ├──── #5 회사 레퍼런스 구축
            │
            ▼
         #6 Skill 통합 조립
            │
            ▼
         #7 QA & 테스트
```

## Workstream Details

| # | Workstream | Owner | Deliverables | Depends On |
|---|---|---|---|---|
| 1 | 마케팅 전략 수립 | Strategist | 채널별 전략, 타겟 페르소나, 콘텐츠 캘린더, 톤앤매너 가이드 | — |
| 2 | Skill 구조 설계 | Architect | SKILL.md 뼈대, 디렉토리 구조, 명령어 플로우 설계 | — |
| 3 | 콘텐츠 템플릿 제작 | Writer + Editor | 숏폼 대본, 카드뉴스, 블로그, LinkedIn, SNS 캡션 템플릿 | #1, #2 |
| 4 | 채널별 가이드 제작 | Designer + Strategist | 플랫폼별 규격·해시태그·게시 시간·포맷 가이드 | #1 |
| 5 | 회사 레퍼런스 구축 | Writer | 파란두루미 제품 설명, 성과, FAQ, 키 메시지 정리 | #1 |
| 6 | Skill 통합 조립 | Architect | 전략+템플릿+가이드+레퍼런스를 하나의 skill로 조립 | #3, #4, #5 |
| 7 | QA & 테스트 | QA Engineer | 모든 콘텐츠 타입별 생성 테스트, 품질 검증 | #6 |
