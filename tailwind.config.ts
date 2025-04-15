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
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
                    '50': '#f1f0fb',
                    '100': '#e6e1f8',
                    '200': '#d1c8f3',
                    '300': '#b9a7ed',
                    '400': '#9b87f5', // Primary Purple
                    '500': '#7e69ab', // Secondary Purple
                    '600': '#6a4f99',
                    '700': '#5a3e86',
                    '800': '#4b336e',
                    '900': '#3d2a59',
                    '950': '#221f26', // Dark Charcoal
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
					foreground: 'hsl(var(--accent-foreground))',
                    '300': '#a78df7',
                    '400': '#9473f5',
                    '500': '#7c59f1',
                    '600': '#6744ed',
                    '700': '#5230d9',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
                blue: {
                    '400': '#0EA5E9', // Ocean Blue
                    '500': '#0284c7',
                    '600': '#0369a1',
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { 
                        opacity: 1,
                        boxShadow: '0 0 10px rgba(155, 135, 245, 0.5), 0 0 20px rgba(155, 135, 245, 0.3)'
                    },
                    '50%': { 
                        opacity: 0.8,
                        boxShadow: '0 0 15px rgba(155, 135, 245, 0.7), 0 0 30px rgba(155, 135, 245, 0.5)'
                    },
                },
                'spin-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'sparkle': {
                    '0%, 100%': { opacity: 0, transform: 'scale(0.8) rotate(0deg)' },
                    '50%': { opacity: 1, transform: 'scale(1.2) rotate(180deg)' },
                },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'spin-slow': 'spin-slow 8s linear infinite',
                'sparkle': 'sparkle 2s ease-in-out infinite',
			},
            fontFamily: {
                'caveat': ['Caveat', 'cursive'],
                'inter': ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'nyc-skyline': "url('/skyline.png')",
                'gradient-primary': 'linear-gradient(135deg, #9b87f5, #7e69ab)',
                'gradient-dark': 'linear-gradient(to bottom, #1a1f2c, #433873, #9b87f5)',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
