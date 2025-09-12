# Lanchonete & Cia - Restaurant Website

## Overview

This is a modern full-stack restaurant website for "Lanchonete & Cia - Açaí & Cia", a Brazilian restaurant in Vila Real, Portugal. The application features a responsive single-page design showcasing the restaurant's menu, customer reviews, contact information, and authentic Brazilian atmosphere. Built with React, TypeScript, and Express.js, it provides both a customer-facing website and a foundation for menu management functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side navigation
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom design system following Brazilian restaurant aesthetics
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Comprehensive data models for menu items, reviews, restaurant info, and user management
- **API Design**: RESTful endpoints following conventional patterns for CRUD operations
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Database Design
- **Menu Items**: Supports categorization (Açaí, Hambúrgueres, Salgados, etc.), pricing, descriptions, and availability flags
- **Reviews**: Customer feedback system with ratings, verification status, and multiple source support
- **Restaurant Info**: Centralized configuration for business details, hours, and contact information
- **Users**: Authentication-ready user management system

### Design System
- **Color Palette**: Brazilian-inspired theme with deep purple (açaí), warm whites, and rich greens
- **Typography**: Poppins for headings (Brazilian feel) and Inter for body text
- **Components**: Consistent spacing using Tailwind's 4/8/12/16 scale
- **Responsive**: Mobile-first approach with breakpoint-specific layouts
- **Visual Hierarchy**: Clear section organization with hero, menu, about, reviews, and contact areas

### Development Features
- **Type Safety**: End-to-end TypeScript with shared schemas between frontend and backend
- **Development Experience**: Hot module replacement, error overlays, and Replit integration
- **Code Organization**: Clean separation of concerns with dedicated folders for components, pages, and utilities
- **Asset Management**: Optimized image handling with proper imports and lazy loading

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, and React Router (Wouter)
- **TypeScript**: Full TypeScript support with strict configuration
- **Vite**: Modern build tool with fast HMR and optimized bundling

### UI and Styling
- **Radix UI**: Complete set of accessible UI primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Consistent icon system
- **Class Variance Authority**: Type-safe variant styling system

### Backend Infrastructure
- **Express.js**: Web framework for Node.js
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Session Management**: PostgreSQL session store (connect-pg-simple)

### Development Tools
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation (@hookform/resolvers)
- **Zod**: Schema validation and TypeScript inference
- **Date-fns**: Modern date utility library

### Database and Hosting
- **PostgreSQL**: Primary database with Drizzle migrations
- **Environment Variables**: DATABASE_URL for database connection
- **Replit Integration**: Development environment plugins and runtime error handling