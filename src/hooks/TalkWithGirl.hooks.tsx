import type { GirlType } from "@/types/TalkWithGirl.type";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useTalkWithGirl = () => {
  // 女の子別のデータ
  const girlData = {
    gal: "ギャル",
  } as const;

  // こちらから送るメッセージ
  const [message, setMessage] = useState<string | undefined>();

  // ギャルから返ってくるメッセージ
  const [resposneMessage, setResponseMessage] = useState<string | undefined>();

  // 画像の状態
  const [imageStatus, setImageStatus] = useState<
    "default" | "thinking" | "talking"
  >("default");

  // ボタンの有効無効
  const [isDisabled, setIsDisabled] = useState(false);

  // iosで音声を流すことが有効か否か
  const [ableVoiceOutput, setAbleVoiceOutput] = useState(false);

  /**
   * iosで音声を流せるようにするメソッド.
   * @description iosは一度音声を流さないと音声が流れない
   */
  const enableVoiceOutput = useCallback(() => {
    var speechSynthesis = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance("");
    speechSynthesis.speak(utterance);
    setAbleVoiceOutput(true);
    window.removeEventListener("touchend", enableVoiceOutput);
  }, []);

  useEffect(() => {
    if (!ableVoiceOutput) {
      // イベントリスナーを登録
      window.addEventListener("touchend", enableVoiceOutput);
    }
  }, [ableVoiceOutput, enableVoiceOutput]);

  /**
   * 入力テキストを変数に格納するメソッド.
   */
  const handleChange = useCallback((inputText: string) => {
    setMessage(inputText);
  }, []);

  /**
   * 女の子とお話しするメソッド.
   * @params message - こちらから送信するメッセージ
   * @params girlMode - 女の子のモード
   */
  const talkWithGirl = useCallback(
    async (message: string | undefined, girlMode: GirlType) => {
      if (!message) return;

      try {
        // ボタンを無効に
        setIsDisabled(true);

        // 画像を考え中に変更
        setImageStatus("thinking");

        // Gemini APIにリクエスト
        const response = await axios.post("/api/talk", {
          message: message,
          girlMode: girlMode,
        });
        const data = response.data.responseMessages;

        // 画像をtalkingに変更
        setImageStatus("talking");

        // 表示メッセージの更新
        setResponseMessage(data);

        // 音声の再生
        const uttr = new SpeechSynthesisUtterance(data);
        uttr.lang = "ja-JP";
        speechSynthesis.speak(uttr);

        // 読み上げが完了したら画像をデフォルトに戻す
        uttr.onend = (_e) => {
          // 値リセット
          setImageStatus("default");
          setIsDisabled(false);
        };
      } catch (e) {
        const errorText = "エラーが発生したみたい、もう一度試してみて";
        console.log("⚠️エラーが発生しました。" + e);

        // 画像をtalkingに変更
        setImageStatus("talking");

        // 表示メッセージの更新
        setResponseMessage(errorText);

        // 音声の再生
        const uttr = new SpeechSynthesisUtterance(errorText);
        uttr.lang = "ja-JP";
        speechSynthesis.speak(uttr);

        // 読み上げが完了したら画像をデフォルトに戻す
        uttr.onend = (_e) => {
          // 値リセット
          setImageStatus("default");
          setIsDisabled(false);
        };
      }
    },
    []
  );

  return {
    girlData,
    message,
    setMessage,
    handleChange,
    talkWithGirl,
    resposneMessage,
    imageStatus,
    isDisabled,
  };
};
