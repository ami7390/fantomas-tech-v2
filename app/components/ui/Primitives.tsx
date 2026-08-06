"use client";
import type {ButtonHTMLAttributes,HTMLAttributes,ReactNode} from "react";

export function UiButton({variant="default",className="",...props}:ButtonHTMLAttributes<HTMLButtonElement>&{variant?:"default"|"outline"|"ghost"}){return <button data-slot="button" data-variant={variant} className={`ui-button ${className}`} {...props}/>}
export function UiBadge({children,className=""}:{children:ReactNode;className?:string}){return <span data-slot="badge" className={`ui-badge ${className}`}>{children}</span>}
export function UiCard({className="",...props}:HTMLAttributes<HTMLElement>){return <article data-slot="card" className={`ui-card ${className}`} {...props}/>}
export function UiIcon({children,className=""}:{children:ReactNode;className?:string}){return <span data-slot="icon" className={`ui-icon ${className}`}>{children}</span>}
