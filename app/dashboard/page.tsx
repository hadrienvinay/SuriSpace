import prisma from "@/lib/prisma";
import DashboardClient, { type DashboardProps } from "@/app/dashboard/DashboardClient";
import { STATIC_POSTS } from "@/data/posts";

export default async function Dashboard() {
  const [
    messages,
    links,
    bookCount,
    projectCount,
    messageCount,
    actionCount,
    projects,
  ] = await Promise.all([
    prisma.message.findMany(),
    prisma.link.findMany(),
    prisma.book.count(),
    prisma.project.count(),
    prisma.message.count(),
    prisma.action.count(),
    prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, siteUrl: true, siteUrlPublic: true, link: true, tags: true },
    }),
  ]);

  const daysSinceCreation = Math.floor(
    (Date.now() - new Date('2026-01-24').getTime()) / 86_400_000
  );

  const knowledgeBase: DashboardProps['knowledgeBase'] = [
    { label: 'Étoiles',         count: 111, lines: 1403, color: '#FBBF24', icon: 'star'      },
    { label: 'Système solaire', count: 48,  lines: 1240, color: '#60A5FA', icon: 'orbit'     },
    { label: 'Physique',        count: 52,  lines: 1095, color: '#22D3EE', icon: 'sigma'     },
    { label: 'Plantes',         count: 49,  lines: 1034, color: '#34D399', icon: 'leaf'      },
    { label: 'Saisons',         count: 32,  lines: 755,  color: '#FB923C', icon: 'sun'       },
    { label: 'Scientifiques',   count: 31,  lines: 741,  color: '#A78BFA', icon: 'scientist' },
    { label: 'Éléments',        count: 118, lines: 624,  color: '#6EE7B7', icon: 'atom'      },
    { label: 'Galaxies',        count: 22,  lines: 441,  color: '#818CF8', icon: 'galaxy'    },
    { label: 'Citations',       count: 50,  lines: 322,  color: '#F472B6', icon: 'quote'     },
    { label: 'Messier',         count: 110, lines: 156,  color: '#C4B5FD', icon: 'telescope' },
  ];

  const props: DashboardProps = {
    messages,
    links,
    projects,
    articleCount:     STATIC_POSTS.length,
    projectCount:     projectCount + 1,
    messageCount,
    bookCount,
    actionCount,
    moocCount:        3,
    pageCount:        74,
    componentCount:   46,
    apiRouteCount:    21,
    prismaModelCount: 10,
    dataFileCount:    10,
    totalDataLines:   7811,
    daysSinceCreation,
    knowledgeBase,
  };

  return <DashboardClient {...props} />;
}
