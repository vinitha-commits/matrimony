"use client";

import { use } from "react";
import Link from "next/link";
import { Avatar, Button } from "@/components/ui";
import { ChatBubble, ChatInput } from "@/components/domain";
import { ArrowLeft, MoreVertical, Phone } from "lucide-react";
import type { ChatMessage } from "@/types";
import { useTranslation } from "@/lib/i18n";

const MOCK_MESSAGES: ChatMessage[] = [
  { id: "m1", conversationId: "conv-1", senderId: "other", content: "Hi! I came across your profile and really liked it. Our horoscopes seem compatible too!", type: "text", sentAt: new Date(Date.now() - 7200000).toISOString(), isRead: true, status: "read" },
  { id: "m2", conversationId: "conv-1", senderId: "me", content: "Hello! Thank you for reaching out. I noticed we are from the same community.", type: "text", sentAt: new Date(Date.now() - 6600000).toISOString(), isRead: true, status: "read" },
  { id: "m3", conversationId: "conv-1", senderId: "other", content: "Yes! My family is originally from Thanjavur. What about yours?", type: "text", sentAt: new Date(Date.now() - 6000000).toISOString(), isRead: true, status: "read" },
  { id: "m4", conversationId: "conv-1", senderId: "me", content: "We are from Kumbakonam. It's nice to connect with someone from a similar background.", type: "text", sentAt: new Date(Date.now() - 5400000).toISOString(), isRead: true, status: "read" },
  { id: "m5", conversationId: "conv-1", senderId: "other", content: "That's wonderful! My father is a retired professor and my mother is a homemaker. We follow traditional values but are open-minded.", type: "text", sentAt: new Date(Date.now() - 4800000).toISOString(), isRead: true, status: "read" },
  { id: "m6", conversationId: "conv-1", senderId: "me", content: "That sounds similar to my family. My father worked in the government sector. We also value traditions while being progressive.", type: "text", sentAt: new Date(Date.now() - 4200000).toISOString(), isRead: true, status: "read" },
  { id: "m7", conversationId: "conv-1", senderId: "other", content: "I checked the porutham and 8 out of 10 match! My parents are very happy about it.", type: "text", sentAt: new Date(Date.now() - 3600000).toISOString(), isRead: true, status: "read" },
  { id: "m8", conversationId: "conv-1", senderId: "me", content: "That's great to hear! I also noticed the star compatibility is strong. Would your family be open to a video call first?", type: "text", sentAt: new Date(Date.now() - 2400000).toISOString(), isRead: true, status: "delivered" },
  { id: "sys1", conversationId: "conv-1", senderId: "system", content: "You've been chatting for a while. Ready to exchange numbers?", type: "system", sentAt: new Date(Date.now() - 1200000).toISOString(), isRead: true, status: "sent" },
  { id: "m9", conversationId: "conv-1", senderId: "other", content: "Absolutely! My parents would love to talk to your family. When would be a good time?", type: "text", sentAt: new Date(Date.now() - 600000).toISOString(), isRead: true, status: "read" },
  { id: "m10", conversationId: "conv-1", senderId: "other", content: "Thank you! When would be a good time to talk?", type: "text", sentAt: new Date(Date.now() - 120000).toISOString(), isRead: false, status: "delivered" },
];

export default function ChatThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-[calc(100dvh-64px-56px)] lg:h-[calc(100dvh-64px)] -mx-4 -my-6 md:-mx-6 lg:-mx-8">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3">
        <Button variant="text" size="sm" asChild className="lg:hidden">
          <Link href="/chat"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <Avatar name="Priya V." size="md" showOnline />
        <div className="flex-1 min-w-0">
          <Link href="/profile/TM10001" className="text-sm font-semibold text-neutral-900 hover:text-primary-600">
            Priya Venkatesh
          </Link>
          <p className="text-xs text-success">{t.common.onlineNow}</p>
        </div>
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5 text-neutral-500" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5 text-neutral-500" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-bg-secondary px-4 py-4 space-y-3">
        {MOCK_MESSAGES.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === "me"}
          />
        ))}
      </div>

      {/* Input */}
      <ChatInput onSend={() => {}} />
    </div>
  );
}
