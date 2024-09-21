import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function HirakanjiType() {
  const [showModal, setShowModal] = useState(false);
  const [showKanji, setShowKanji] = useState(false);

  return (
    <>
      <section 
        className="bg-center bg-cover bg-no-repeat bg-gray-700 bg-blend-multiply min-h-screen"
        style={{backgroundImage: "url('img/baner.jpeg')"}}
      >
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-[25vh]">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Welcome to Hirakanji Type
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Platform latihan mengetik huruf hiragana, katakana kanji dan pastinya sudah ter integrasi dengan Gemini AI untuk meningkatkan penguasaan hiragana, katakana dan kanji
            Btw sudah hafal hiragana, katakana kanji belum? kalo sudah langsung aja cuss latihan disini
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Button variant="default" size="lg" asChild>
              <a href="#started">
                Get started
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="">Guide</a>
            </Button>
          </div>
        </div>
      </section>

      <div id="started" className="min-h-screen flex items-center justify-center py-20">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader className="relative">
            <button id="regenerate-button" className="absolute top-1 right-2 text-gray-500 hover:text-gray-700">
              <svg width="30px" height="30px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path fill="#000000" fillRule="evenodd" d="M126.645 38.17c5.11-6.317 14.804-7.687 21.426-1.868a79.223 79.223 0 0 1 23.621 36.826 79.01 79.01 0 0 1-.578 47.096 79.246 79.246 0 0 1-27.272 38.441 79.654 79.654 0 0 1-44.308 16.233 79.695 79.695 0 0 1-45.728-11.671 79.326 79.326 0 0 1-31.04-35.482A79.02 79.02 0 0 1 17.4 80.951a79.118 79.118 0 0 1 13.323-31.142l-3.116-3.103C16.18 35.32 24.367 16 40.32 16h39.514c9.9 0 18 8.007 18 17.978v39.368c0 16.099-19.432 23.965-30.712 12.727l-2.721-2.71a33.174 33.174 0 0 0 .442 25.823 33.377 33.377 0 0 0 13.065 14.929 33.635 33.635 0 0 0 37.988-1.922 33.33 33.33 0 0 0 11.473-16.167 33.168 33.168 0 0 0 .243-19.773 33.308 33.308 0 0 0-9.4-15.004c-5.509-5.055-6.948-14.064-1.607-20.667l10.041-12.412ZM55.377 74.373a45.178 45.178 0 0 0-1.508 39.67 45.381 45.381 0 0 0 17.759 20.298 45.633 45.633 0 0 0 26.182 6.682 45.608 45.608 0 0 0 25.367-9.292 45.327 45.327 0 0 0 15.601-21.989 45.167 45.167 0 0 0 .331-26.925 45.313 45.313 0 0 0-12.785-20.41c-1.219-1.119-1.43-2.993-.39-4.278l10.04-12.412c1.04-1.285 2.934-1.492 4.176-.4a67.214 67.214 0 0 1 20.044 31.247 67.003 67.003 0 0 1-.49 39.944 67.248 67.248 0 0 1-23.144 32.619 67.648 67.648 0 0 1-37.633 13.786 67.696 67.696 0 0 1-38.842-9.912 67.327 67.327 0 0 1-26.345-30.114 67.018 67.018 0 0 1-4.554-39.688 67.164 67.164 0 0 1 17.76-34.165l-10.87-10.83C32.296 34.44 34.973 28 40.319 28h39.514c3.314 0 6 2.676 6 5.978v39.368c0 5.325-6.463 7.992-10.242 4.226L62.506 64.536a45.334 45.334 0 0 0-7.129 9.837Z" clipRule="evenodd"/>
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-center my-4" id="romaji-text">Loading...</h2>
          </CardHeader>
          <CardContent>
            <Textarea id="kana-input" placeholder="Type here..." className="mb-4" />
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Choose Category:</Label>
                <Select onValueChange={(value) => setShowKanji(value === "Kanji")}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hiragana-katakana">Hiragana & Katakana</SelectItem>
                    <SelectItem value="Kanji">Kanji</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="lengt-text">Category text:</Label>
                <Select>
                  <SelectTrigger id="lengt-text">
                    <SelectValue placeholder="Category text" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satukalimatsaja">Kalimat Pendek</SelectItem>
                    <SelectItem value="textwacana5kalimatmudah">Teks wacana - Easy</SelectItem>
                    <SelectItem value="textwacana5kalimatmedium">Teks wacana - Medium</SelectItem>
                    <SelectItem value="textwacana5kalimatkompleks">Teks wacana - Kompleks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {showKanji && (
                <div>
                  <Label htmlFor="level-kanji">Level Kanji:</Label>
                  <Select>
                    <SelectTrigger id="level-kanji">
                      <SelectValue placeholder="Level Kanji" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="N3">N3</SelectItem>
                      <SelectItem value="N4">N4</SelectItem>
                      <SelectItem value="N5">N5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button className="w-full" onClick={() => setShowModal(true)}>Analyze</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <h3 className="text-lg font-bold">Analysis Result</h3>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <p id="analysis-result">Your analysis result goes here.</p>
              </ScrollArea>
            </CardContent>
            <div className="p-4">
              <Button variant="destructive" className="w-full" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}