# Tian’s Photography Platform

A high-performance, full-stack portfolio and gallery management system designed to showcase the professional works of Tian. This platform prioritizes visual fidelity while maintaining web performance through automated image processing and edge-caching strategies. **All photographs featured on this platform are the exclusive property of Tian.**

<img width="800"  alt="demo image" src="https://github.com/user-attachments/assets/79456acb-c497-466b-b4f3-0b698796bfa3" />


## Key Technical Achievements
* **Sub-500ms Performance**: Leveraged **Cloudflare Edge-Caching** and **Neon PostgreSQL** to achieve sub-500ms page loads.
* **60% LCP Optimization**: Engineered a pipeline using **Sharp** to convert raw assets into multi-resolution **WebP** formats, significantly reducing Largest Contentful Paint (LCP).
* **Production-Grade CI/CD**: Maintained **95%+ backend code coverage** with Vitest and Supertest, integrated into a GitHub Actions pipeline for zero-downtime deployments.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, HTML/CSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Storage** | Cloudflare R2 (S3-compatible)|
| **Testing** | Vitest, Supertest |
| **Deployment** | Vercel, GitHub Actions |

## System Architecture
```mermaid

graph TD
    %% 角色定義
    User((Visitor))
    Admin((Client/Admin))

    %% 前端
    subgraph Frontend 
        Gallery[Public Gallery View]
        UploadForm[Admin Upload Dashboard]
    end

    %% 後端處理
    subgraph Backend 
        Auth[JWT Authentication]
        API[RESTful API Endpoints]
        Sharp[Sharp Image Processor]
    end

    %% 存儲分流
    subgraph Storage [Hybrid Storage Strategy]
        R2[(Cloudflare R2 Bucket)]
        DB[(Neon PostgreSQL)]
        CDN[Cloudflare Global CDN]
    end

    %% 用戶流：看到網站並從 R2 抓圖
    User --> Gallery
    Gallery -.->|Request Image| CDN
    Gallery -.->|Request Content & Image Metadata| DB
    CDN -.->|Fetch Asset| R2

    %% 管理員流：上傳與排序
    Admin --> Auth
    Auth --> UploadForm
    UploadForm --> API

    %% 後端分流邏輯 (關鍵亮點)
    API --> Sharp
    Sharp -->|Save Optimized WebP| R2
    API -->|Save Content & Image Metadata| DB
    
```



