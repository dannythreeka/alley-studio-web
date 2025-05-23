import { NextRequest, NextResponse } from 'next/server';

const supportedLanguages = ['zh-TW', 'en', 'ja'];
const defaultLanguage = 'zh-TW';

// Function to get the preferred language from request headers
function getPreferredLanguage(request: NextRequest): string {
  // Try to get language from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse the Accept-Language header and find the first matching language
    const preferredLanguages = acceptLanguage.split(',').map((lang) => {
      const [language] = lang.trim().split(';');
      return language;
    });

    // Check for exact match first
    for (const lang of preferredLanguages) {
      if (supportedLanguages.includes(lang)) {
        return lang;
      }
    }

    // Then check for language prefix matches
    for (const lang of preferredLanguages) {
      const prefix = lang.split('-')[0];
      if (prefix === 'en' && supportedLanguages.includes('en')) {
        return 'en';
      } else if (prefix === 'ja' && supportedLanguages.includes('ja')) {
        return 'ja';
      } else if (prefix === 'zh' && supportedLanguages.includes('zh-TW')) {
        return 'zh-TW';
      }
    }
  }

  // Default to Traditional Chinese
  return defaultLanguage;
}

// Function to check if the URL already has a language prefix
function hasLanguagePrefix(pathname: string): boolean {
  const segments = pathname.split('/');
  return segments.length > 1 && supportedLanguages.includes(segments[1]);
}

// The actual middleware function
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Skip if the URL already has a language prefix
  if (hasLanguagePrefix(pathname)) {
    return NextResponse.next();
  }

  // Get the preferred language from cookies or headers
  const preferredLanguage = getPreferredLanguage(request);

  // Only add language prefix if it's not the default language
  if (preferredLanguage !== defaultLanguage) {
    // Clone the URL and add the language prefix
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLanguage}${pathname}`;
    if (search) {
      url.search = search;
    }
    // Redirect to the URL with language prefix
    return NextResponse.redirect(url);
  }

  // Continue without modification for default language
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|images|public|api).*)',
  ],
};
