# RemoteCraft

A remote job listing app built with Next.js and the [Remotive API](https://remotive.com/remote-jobs/api).

---
##  Project Setup

This project is part of a learning module focused on rendering strategies in Next.js. It emphasizes:

- **Static Generation (`getStaticProps`, `getStaticPaths`)**
- **Incremental Static Regeneration (ISR)**
- **Dynamic Routing**

---

##  Week 1 Goals: Core Pages & Rendering Strategies

###  Tasks

#### 1. Initialize the Project
- Create a new Next.js project
- Install dependencies
- Set up a global layout with a persistent navigation bar across all pages

#### 2. Homepage with Job Listings
- Fetch jobs from the Remotive public API
- Use `getStaticProps` for static generation
- Enable **Incremental Static Regeneration (ISR)** with a 10–30 second revalidation interval

#### 3. Job Detail Page
- Dynamic route: `/jobs/[slug]`
- Use `getStaticPaths` and `getStaticProps` for static generation of job pages
- Handle `fallback: true` to enable ISR for new jobs
- Display a loading state during fallback

#### 4. Company Pages (`/company/[slug]`)
- Use dynamic routing for each company
- Filter jobs by company name and reuse the job listing component

---

##  UI Design

- Global font: `Work Sans`
- Theme colors:
  - `Gray: #F0F2F5`
  - `Blue: #1A80E5`
- Consistent navbar across all pages

---

##  Reflective Questions

Responses should go in a separate `reflection.md` file.

- What makes a page a good candidate for `getStaticProps` versus `getServerSideProps`?
- How does ISR differ from traditional SSG?
- What happens during fallback states?

---

##  API Reference

- Remotive Jobs API: [https://remotive.com/remote-jobs/api](https://remotive.com/remote-jobs/api)

---