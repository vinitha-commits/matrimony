"use client";

import Link from "next/link";
import { Avatar, Badge, EmptyState } from "@/components/ui";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

const MOCK_CONVERSATIONS = [
  {
    id: "conv-1",
    name: "Priya V.",
    lastMessage: "Thank you! When would be a good time to talk?",
    time: "2m ago",
    unread: 2,
    isOnline: true,
  },
  {
    id: "conv-2",
    name: "Kavitha S.",
    lastMessage: "Sure, let me check with my family and get back to you.",
    time: "1h ago",
    unread: 0,
    isOnline: false,
  },
  {
    id: "conv-3",
    name: "Meena R.",
    lastMessage: "Hi! I noticed we have matching stars. Shall we discuss?",
    time: "3d ago",
    unread: 0,
    isOnline: false,
  },
  {
    id: "conv-4",
    name: "Lakshmi N.",
    lastMessage: "My parents would like to speak with your family this weekend.",
    time: "5h ago",
    unread: 1,
    isOnline: true,
  },
  {
    id: "conv-5",
    name: "Sangeetha R.",
    lastMessage: "That sounds great! I also enjoy Carnatic music.",
    time: "1d ago",
    unread: 0,
    isOnline: false,
  },
  {
    id: "conv-6",
    name: "Deepa K.",
    lastMessage: "Yes, I'm based in Coimbatore. We could meet when you visit.",
    time: "4d ago",
    unread: 0,
    isOnline: false,
  },
];

export default function ChatListPage() {
  const { t } = useTranslation();

  if (MOCK_CONVERSATIONS.length === 0) {
    return (
      <EmptyState
        icon={<MessageSquare className="h-8 w-8" />}
        title={t.chat.noConversations}
        description={t.chat.noConversationsDesc}
        action={{ label: t.interests.findMatches, href: "/search" }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">{t.chat.title}</h1>

      <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-white overflow-hidden divide-y divide-neutral-200">
        {MOCK_CONVERSATIONS.map((conv) => (
          <Link
            key={conv.id}
            href={`/chat/${conv.id}`}
            className={cn(
              "flex items-center gap-4 px-4 py-3 hover:bg-neutral-50 transition-colors",
              conv.unread > 0 && "bg-primary-50/30"
            )}
          >
            <Avatar name={conv.name} size="lg" showOnline={conv.isOnline} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-sm truncate",
                  conv.unread > 0 ? "font-semibold text-neutral-900" : "font-medium text-neutral-800"
                )}>
                  {conv.name}
                </span>
                <span className="text-xs text-neutral-400 shrink-0 ml-2">{conv.time}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className={cn(
                  "text-sm truncate",
                  conv.unread > 0 ? "text-neutral-800 font-medium" : "text-neutral-500"
                )}>
                  {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1.5 text-[10px] font-bold text-white">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
