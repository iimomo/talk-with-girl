import { GirlType } from "@/types/TalkWithGirl.type";
import axios from "axios";
import { NextResponse } from "next/server";

// 人格用prompt
const defaultPrompt = {
  gal: "あなたはポジティブなギャルです。一人称は「あーし」で、二人称は「きみ」です。これを踏まえた上で、回答してください。",
};

export async function POST(request: any) {
  // APIキー
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  // 送信データ
  const requestBody = await request.json();
  const message = requestBody.message;
  // ページのURLを制御しているのでasで指定して問題なし
  const girlMode = requestBody.girlMode as GirlType;
  const prompt = defaultPrompt[girlMode];

  // 文字数が50文字以上の場合
  if (message.length >= 50) {
    return NextResponse.json({
      status: 200,
      responseMessages: "そんなにたくさん喋らないで！！パンクしちゃう！",
    });
  }

  const endPoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt + "「" + message + "」",
          },
        ],
      },
    ],
  };

  const response = await axios.post(endPoint, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.data.candidates[0].content.parts[0].text;

  return NextResponse.json({ status: 200, responseMessages: data });
}
