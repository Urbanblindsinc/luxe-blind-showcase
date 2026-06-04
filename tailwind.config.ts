
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			}
		},
			extend: {
				fontFamily: {
					sans: ['Lato', 'Inter', 'system-ui', 'sans-serif'],
					display: ['Playfair Display', 'Montserrat', 'serif'],
				},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				gold: {
					light: '#f5deb3',
					DEFAULT: '#d4af37',
					dark: '#b8860b'
				},
				navy: {
					light: '#4a6fa0',
					DEFAULT: '#0f3460',
					dark: '#0a2344'
				},
				teal: {
					light: '#8fd1cd',
					DEFAULT: '#2c8c86',
					dark: '#1e6964'
				},
				plum: {
					light: '#d3b8e0',
					DEFAULT: '#8b5cf6',
					dark: '#6d46c5'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'zoom-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'blur-in': {
					'0%': { filter: 'blur(8px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out forwards',
				'fade-out': 'fade-out 0.3s ease-out forwards',
				'slide-up': 'slide-up 0.3s ease-out forwards',
				'slide-down': 'slide-down 0.3s ease-out forwards',
				'zoom-in': 'zoom-in 0.3s ease-out forwards',
				'scale-in': 'scale-in 0.2s ease-out forwards',
				'blur-in': 'blur-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gold-gradient': 'linear-gradient(to right, #d4af37, #f5deb3, #d4af37)',
				'blue-gradient': 'linear-gradient(to right, #33C3F0, #1EAEDB, #0FA0CE)',
				'navy-gradient': 'linear-gradient(135deg, #0a2344 0%, #4a6fa0 100%)',
				'plum-gradient': 'linear-gradient(to right, #6d46c5, #8b5cf6, #d3b8e0)',
				'teal-gradient': 'linear-gradient(to right, #1e6964, #2c8c86, #8fd1cd)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
