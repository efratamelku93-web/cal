import React, { useState, useEffect } from "react";
import AI from "./Ai.jsx";
import Request from "./Request.jsx";
import { GraduationCap, FileText, Download, LifeBuoy, Users, Heart, Wallet, Brain, Target, BookOpen, Info, Send, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./advice.css";
import StudentRequests from "./StudentRequests.jsx"; 

// ... የተቀረው የ Advice ኮድ ይቀጥላል ...

// Assetsz
import ams from "../assets/img/advice/am.png";
import ens from "../assets/img/advice/en.png";
import v1 from "../assets/video/advice/v1.mp4";
import v2 from "../assets/video/advice/v2.mp4";
import v3 from "../assets/video/advice/የወቀሳ፥ የሰበብ፥ እድል የመጠበቅና የማማረር መፍትሄ .mp4";

import a1 from "../assets/video/advice/v4/a1.mp4";
import a2 from "../assets/video/advice/v4/a2.mp4";
import a3 from "../assets/video/advice/v4/a3.mp4";
import a4 from "../assets/video/advice/v4/a4.mp4";

import b1 from "../assets/video/advice/v4/b1.mp4";
import b2 from "../assets/video/advice/v4/b2.mp4";
import b3 from "../assets/video/advice/v4/b3.mp4";
import b4 from "../assets/video/advice/v4/b4.mp4";
import b5 from "../assets/video/advice/v4/b5.mp4";
import d1 from "../assets/video/advice/v4/d1.mp4";
import d2 from "../assets/video/advice/v4/d2.mp4";
import d3 from "../assets/video/advice/v4/d3.mp4";
import d4 from "../assets/video/advice/v4/d4.mp4";

import e1 from "../assets/video/advice/v4/e1.mp4";
import e2 from "../assets/video/advice/v4/e2.mp4";

import e3 from "../assets/video/advice/v4/e3.mp4";

import f1 from "../assets/video/advice/v5/f1.mp4";
import f2 from "../assets/video/advice/v5/f2.mp4";
import f3 from "../assets/video/advice/v5/f3.mp4";
import f4 from "../assets/video/advice/v5/f4.mp4";
import f5 from "../assets/video/advice/v5/f5.mp4";

import g1 from "../assets/video/advice/v5/g1.mp4";
import g2 from "../assets/video/advice/v5/g2.mp4";
import g3 from "../assets/video/advice/v5/g3.mp4";
import g4 from "../assets/video/advice/v5/g4.mp4";
import g5 from "../assets/video/advice/v5/g5.mp4";
import g6 from "../assets/video/advice/v5/g6.mp4";
const ADVICE_DATA = {
  1: {
    title: { en: "Guidance and Counseling", am: "የመመሪያ እና የምክር አገልግሎት" },
    icon: <LifeBuoy className="w-5 h-5" />,
    video: a1,
    pdf: "/public/counseling_and_guidance.pdf",
    detailedContent: {
      en: `The Guidance and Counseling Office is a safe space designed to help you excel academically, stabilize your mental health, and develop essential life skills.
      
      🎓 Academic & Career Excellence:
      • Study Skills: Identifying your learning style (Visual, Auditory, Kinesthetic) to study smarter
      • Time Management: Creating balanced schedules prioritizing lectures and study time
      • Department Selection: Aligning talents and passions with the right field of study
      • Test Anxiety Management: Techniques to stay calm and focused during exams
      
      💚 Mental Health & Personal Well-being:
      • Adjustment Counseling: Support for freshman stress and transition
      • Stress & Anxiety Management: Professional help for overthinking and loneliness
      • Substance Abuse Prevention: Building resilience against harmful habits
      • Self-Confidence Building: Strengthening self-esteem for campus life
      
      "University is a marathon, not a sprint. Success depends on how well you utilize support systems around you."`,

      am: `የገላጭና የምክር አገልግሎት ቢሮ በአካዳሚክ ውጤታማ እንድትሆን እና የአእምሮ ጤናህን እንድትጠብቅ የተዘጋጀ አስተማማኝ ቦታ ነው።
      
      🎓 የአካዳሚክ ስኬት፡
      • የጥናት ስልት፡ እንደየባህሪህ የሚስማማህን አጠናን መለየት
      • የጊዜ አጠቃቀም፡ የ24 ሰዓት የጊዜ ሰሌዳ በማውጣት ለጥናት እና ለእረፍት እኩል ትኩረት መስጠት
      • የፈተና ጭንቀት፡ ፈተና ሲቃረብ የሚመጣን ፍርሃት ማሸነፍ
      
      💚 የስነ-ልቦና ጤና፡
      • ራስን ማላመድ፡ ከቤተሰብ መለየትን እንደ አዲስ የነፃነት ምዕራፍ መቀበል
      • የጭንቀት አያያዝ፡ ከመጠን በላይ ማሰብን ማቆም
      • የሱስ መከላከያ፡ "አይ" የማለት ክህሎትን ማዳበር`
    }

  },

  2: {
    title: { en: "Freshman Coordination", am: "የአዲስ ተማሪዎች አስተባባሪ" },
    icon: <Users className="w-5 h-5" />,
    video: b1,
    pdf: "/public/fresh cordination.pdf",
    detailedContent: {
      en: `Here is a more detailed explanation of the Freshman Coordination office and the services it provides, based on the text you provided.
Think of the Freshman Coordination office as your personal GPS and welcome crew for your first year of university.
 Its main goal is to ensure you don't feel lost, overwhelmed, or alone as you transition from high school to university life. 
 It's a central hub designed to help you find your footing, both academically and socially.
Here’s a breakdown of the three main areas of support:
 📚 Department Placement Services
This service is about helping you find your academic "home" and build a solid foundation for your studies. 
It's not just about picking classes; it's about building a roadmap for your entire university career.
- Understanding different department requirements:** Universities can be complex, with different rules for each major (e.g., Engineering, English, Business). This service helps you decode what each department expects.
 For example, they can explain:
    - The specific high school courses you need for admission.
    - The prerequisite courses you must take in your first year to be eligible for a major in your second year.
    - The difference between a Bachelor of Arts and a Bachelor of Science.
    - The grade requirements to stay in a competitive program.
- Career path exploration and guidance:** You might arrive with a clear idea of your future career, or you might have no clue at all. This service helps you connect your interests and academic strengths to potential careers. They can:
    - Help you explore what you can do with a degree in History, Chemistry, or Psychology.
    - Connect your major choice to different professional paths (e.g., law, medicine, business, research).
    - Offer resources like career aptitude tests or invitations to department open houses where you can talk to professors and current students.
- Academic advising for course selection:** This is one of the most practical and important services. An advisor will help you:
    - Choose the right balance of courses for your first semester (e.g., not too many heavy reading or lab courses at once).
    - Ensure you're meeting all the requirements for your intended degree program.
    - Register for classes using the university's online system.
    - Understand your course syllabus and what will be expected of you.
 🏫 Campus Orientation
This service focuses on the physical and logistical aspects of university life. It's about turning an unfamiliar, confusing campus into your new home turf.
- **Campus facility tours and navigation:** Beyond just showing you where the library is, these tours help you find the essential, everyday places:
    - Where is the best place to print an assignment?
    - Where is the student health center?
    - Where are the quiet study spots in the library versus the group study rooms?
    - Where is the gym, the student union building, and the best coffee shop?
    - How do you navigate the underground tunnels or confusing building wings during winter?
- Introduction to university policies and procedures:** University life comes with a new set of rules. This part of orientation helps you understand the official "rulebook" so you can avoid mistakes. Key topics include:
    - Academic integrity:** What constitutes plagiarism and cheating, and how to properly cite your sources.
    - Add/Drop deadlines:** The last day you can change your courses without academic or financial penalty.
    - Grading policies:** How GPA is calculated, what a "C-'' really means, and what to do if you disagree with a grade.
- Student rights and responsibilities:** You are now a member of the university community with both privileges and obligations. You'll learn about:
    - Your right to a safe and respectful learning environment.
    - Your responsibility to treat other students, faculty, and staff with respect.
    - How to access support services if you're struggling.
    - University codes of conduct and what happens if they are violated.
 🤝 Peer Mentorship Programs
This service is about the social and emotional side of the transition. 
It connects you with people who were in your exact shoes just a year or two ago, providing a support system that feels less formal than talking to an advisor or professor.
- Connect with upper-year students:** Mentors are trained to be a friendly, knowledgeable first point of contact. They can answer the "silly" questions you might be embarrassed to ask anyone else, like "What's the dress code for a party at the student pub?" or "Is this professor's exam really as hard as everyone says?"
- Study group formation assistance:** Finding a study group can be daunting. Mentorship programs can help you connect with peers in your classes. Studying with others helps you:
    - Understand material from different perspectives.
    - Prepare for exams together.
    - Stay motivated and accountable.
    - Combat the feeling of isolation that can come with large lecture classes.
- Social integration activities:** University is about more than just studying. These programs organize low-pressure social events (like movie nights, bowling, coffee hours, or game nights) to help you:
    - Make new friends outside of your classes.
    - Build a sense of belonging and community.
    - Discover new interests and hobbies.
    - Develop a healthy social life that balances your academic workload.`,
      am: `እንኳን ደህና መጣህ! ከዚህ በታች የፍሬሽማን ኮርዲኔሽን (Freshman Coordination) ቢሮ ምን እንደሆነ እና ምን አይነት አገልግሎት እንደሚሰጥ በአማርኛ በዝርዝር ተብራርቷል።
 የፍሬሽማን ኮርዲኔሽን ቢሮ (Freshman Coordination) ማብራሪያ
ፍሬሽማን ኮርዲኔሽን -ማለት ለአዲስ ተማሪዎች የመጀመሪያ አመታቸውን በቀላሉ እንዲያልፉ የሚረዳ የዩኒቨርሲቲ ቢሮ ነው። ይህን ቢሮ እንደ **ግል የጂፒኤስ (GPS) መመሪያ እና እንኳን ደህና መጣህ ኮሚቴ አድርገህ ልትቆጥረው ትችላለህ። 
ዋና ተግባሩ ከሁለተኛ ደረጃ ትምህርት ቤት ወደ ዩኒቨርሲቲ ሕይወት በሚደረገው ሽግግር ወቅት ተማሪዎች እንዳይጠፉ፣ እንዳይደክሙ እና ብቻቸውን እንዳይሆኑ ማድረግ ነው።
አገልግሎቶቹ በሶስት ዋና ዋና ክፍሎች ይከፈላሉ፡

 📚 የዲፓርትመንት ምደባ አገልግሎት (Department Placement Services)
ይህ አገልግሎት የትምህርት ክፍልህን (ሜጀርህን) እንድትመርጥ እና ለትምህርትህ ጠንካራ መሰረት እንድትጥል ይረዳል።

- የተለያዩ ዲፓርትመንቶችን መስፈርቶች መረዳት፡-
    ዩኒቨርሲቲዎች ውስብስብ ናቸው። እያንዳንዱ ዲፓርትመንት (ለምሳሌ ኢንጂነሪንግ፣ ሕክምና፣ ቢዝነስ) የራሱ የሆነ ህግ አለው። ይህ አገልግሎት እነዚህን መስፈርቶች ለመረዳት ይረዳሃል። 
    ለምሳሌ፡-
    - ለአንድ የትምህርት ክፍል ለመግባት ምን ዓይነት የሁለተኛ ደረጃ ትምህርት ክፍሎችን (ለምሳሌ ሒሳብ፣ ፊዚክስ) መውሰድ እንዳለብህ።
    - በሁለተኛ አመት ወደምትፈልገው ዲፓርትመንት ለመግባት በመጀመሪያ አመት ማለፍ ያለብህ ቅድመ-ሁኔታ (ፕሪሪክዚዚት) ኮርሶች የትኞቹ ናቸው።
- የሙያ መንገድ ፍለጋ እና መመሪያ፡-
    ምናልባት ምን መሆን እንደምትፈልግ አውቀህ መጥተህ ይሆናል፣ ወይም ምንም ሃሳብ የሌለህ ሊሆን ይችላል። ይህ አገልግሎት ፍላጎትህን እና ችሎታህን ከወደፊት ስራህ ጋር ለማገናኘት ይረዳል። ለምሳሌ፡-
    - "በታሪክ ተመርቄ ምን ልስራ?" ወይም "ሳይኮሎጂ ካጠናሁ በኋላ ምን አይነት ስራ አለ?" ለሚሉት ጥያቄዎች መልስ ማግኘት።
- ኮርስ ለመምረጥ የአካዳሚክ ምክር፡-
    ይህ በጣም ተግባራዊ አገልግሎት ነው።
     አማካሪዎች የሚከተሉትን ይረዱሃል፡-
    - ለመጀመሪያ ሴሚስተርህ ትክክለኛውን የኮርሶች ሚዛን እንድትመርጥ (ከመጠን በላይ ከባድ ኮርሶችን እንዳትወስድ)።
    - ኮርሶችህ ወደምትፈልገው ዲግሪ እንዲያመሩ ማረጋገጥ።
 🏫 የካምፓስ ኦረንቴሽን (Campus Orientation)
ይህ አገልግሎት የሚያተኩረው በዩኒቨርሲቲው አካላዊ እና አስተዳደራዊ ሕይወት ላይ ነው።
- የካምፓስ ስፍራዎች ጉብኝት እና አሰሳ፡-**
    ቤተ-መጽሐፍት የት እንዳለ ከማሳየት ባለፈ፣ አስፈላጊ የሆኑ ቦታዎችን ያሳያል፡-
    - ማተሚያ (ፕሪንት) የት እንዳለ።
    - የተማሪ ጤና ጣቢያ (ሕክምና ክሊኒክ) የት እንዳለ።
    - ጸጥታ የሰፈነበት የጥናት ቦታ የት እንዳለ።
- የዩኒቨርሲቲ ህጎች እና አሰራሮች መግቢያ፡-**
    የዩኒቨርሲቲ ሕይወት ከአዳዲስ ህጎች ጋር አብሮ ይመጣል። ይህ ክፍል ስህተት እንዳትሠራ ይረዳሃል፡-
    - **የአካዳሚክ ታማኝነት (Academic Integrity):
     ማታለል (ኮፒ ማድረግ) ምን ማለት እንደሆነ እና እንዴት ማስወገድ እንደምትችል።
    - **የኮርስ የመጨመሪያ/የማስወገጃ ቀነ-ገደቦች፡-** ያለ ቅጣት ኮርስ መቀየር የምትችልበት የመጨረሻ ቀን።
- የተማሪ መብቶች እና ኃላፊነቶች፡-**
    አሁን የዩኒቨርሲቲው ማህበረሰብ አባል ነህ። ስለሚከተሉት ትማራለህ፡-
    - ደህንነቱ የተጠበቀ እና አክብሮት የተሞላበት የመማሪያ አካባቢ የማግኘት መብትህ።
    - ሌሎች ተማሪዎችን፣ መምህራንን እና ሰራተኞችን የማክበር ኃላፊነትህ።
 🤝 የእኩዮች አማካሪነት ፕሮግራሞች (Peer Mentorship Programs)
ይህ አገልግሎት በማህበራዊ እና ስሜታዊ ድጋፍ ላይ ያተኩራል።
- ከከፍተኛ አመት ተማሪዎች ጋር መገናኘት፡
- አማካሪዎች (ሜንተሮች) ለማንኛውም ጥያቄህ ዝግጁ የሆኑ ወዳጆች ናቸው። ለሌላ ሰው ለመጠየቅ የምታፍራቸውን ጥያቄዎች (ለምሳሌ "ይህ ፕሮፌሰር በእውነት ከባድ ነው?") መጠየቅ ትችላለህ።
- የጥናት ቡድን ለማቋቋም እገዛ፡-
    የጥናት ቡድን መፈለግ አስቸጋሪ ሊሆን ይችላል። ይህ ፕሮግራም በክፍልህ ካሉ ተማሪዎች ጋር እንድትገናኝ ይረዳል።
     አብሮ ማጥናት፡-
    - ትምህርቱን በተሻለ ለመረዳት ይረዳል።
    - ለፈተና ለመዘጋጀት ይረዳል።
    - ብቸኝነትን ለመቋቋም ይረዳል።
- ማህበራዊ ውህደት እንቅስቃሴዎች፡
- ዩኒቨርሲቲ ማጥናት ብቻ አይደለም። እነዚህ ፕሮግራሞች ዝቅተኛ ግፊት ያላቸው ማህበራዊ ዝግጅቶችን (እንደ ፊልም ማታ፣ ቦውሊንግ፣ የቡና ቀን) በማዘጋጀት የሚከተሉትን ለማድረግ ይረዳል፡-
    - ከክፍል ውጭ አዳዲስ ጓደኞችን ማፍራት።
    - የባለቤትነት ስሜት መፍጠር።
    - ከትምህርት ውጭ አዳዲስ ፍላጎቶችን ማግኘት።`
    }
  },
  3: {
    title: { en: "Life Skills Training", am: "የህይወት ክህሎት ስልጠና" },
    icon: <Heart className="w-5 h-5" />,
    video: v1,
    pdf: "/public/life_skills_training.pdf",
    detailedContent: {
      en: `LOW SELF-ESTEEM.
      
       ❤️ How to Start Loving Yourself
Loving yourself is one of the most important life skills you can develop. But many people ask, "How do I
start loving myself?" 
Self-love is not something that happens overnight—it is a habit that you build
gradually,step by step. 
What Is Self-Love?
Self-love does not mean thinking you are perfect. Self-love means: 
- Accepting yourself as you are (including your weaknesses and strengths)
- Speaking to yourself with kindness
- Respecting your own needs and feelings
- Forgiving yourself when you make mistakes
- Taking care of yourself like you would care for someone you love
Signs of Low Self-Esteem
Before you begin loving yourself, it helps to recognize the signs of low self-esteem: 
- Comparing yourself to others
- Negative self-talk (always criticizing yourself)
- Difficulty accepting compliments
- Minimizing your achievements ("I was just lucky")
- Perfectionism (needing to be perfect)
- Always trying to please others

- Difficulty making decisions
10 Practical Ways to Start Loving Yourself
1. Speak Kindly to Yourself
Talk to yourself the way you would talk to someone you love. 
For example: Instead of saying "I'm so stupid," say "This thing didn't work out, but I'll do better next
time." Practice: Every morning, tell yourself three good things about yourself. 
2. Celebrate Small Wins
Celebrate not just big achievements, but small things too. 
- Waking up in the morning
- Attending class
- Cooking a meal - Reading one chapter
Practice: Every evening, write down three things you accomplished that day. 
3. Stop Comparing Yourself to Others
Comparison is the enemy of happiness. We all have different journeys. 
- What people show on social media is only their best side
- Focus on your own path
- Look at how far you've come compared to yesterday
Practice: When you catch yourself comparing, remind yourself: "I have my own journey." 
4. Accept Your Flaws
Nobody is perfect. Your flaws are part of being human. - Every person has weaknesses
- Flaws are areas where you can grow
- Some "flaws" might actually be your unique qualities
Practice: Write down three things you consider your weaknesses. Think about how you might improve
them—or accept them. 
5. Forgive Yourself
We all make mistakes. Instead of dwelling on your mistakes, forgive yourself. 
- Learn from the past, but don't live there
- Making a mistake does not make you a bad person
- Forgiveness frees you from heavy burdens
Practice: Think of one mistake you haven't forgiven yourself for. Say aloud: "I forgive myself. I have
learned." 
6. Take Care of Your Health
Loving yourself means taking care of your body. 
- Get enough sleep (7-8 hours)
- Eat healthy food
- Exercise regularly
- Drink water
- Meditate or rest
Practice: This week, start one new healthy habit. 
7. Distance Yourself from Negative People
The people in your life affect how you see yourself. 
- Identify people who put you down or drain your energy
- Spend time with people who support and encourage you
- Learn to set boundaries
Practice: Think about the people in your life. Who encourages you? Who drains you?
8. Learn Something New
Learning a new skill boosts your confidence. 
- Start a new language
- Learn to play music
- Try drawing or art - Try a new sport

Practice: Commit to learning one new thing this week. 
9. Keep a Success Journal
Write down your achievements and read them back. 
- Write down your strengths
- Write down challenges you've overcome
- Write down nice things others have said about you
- When you feel down, read this journal
Practice: Buy a notebook and label it "My Success Journal." 
10. Ask for Help
Loving yourself doesn't mean doing everything alone. 
- Talk to a trusted friend or family member
- See a counselor or therapist - Join a support group
Practice: Today, call or message one person you trust. Things to Remember
✅ Self-love doesn't happen overnight—it's a process
✅ You don't need to be perfect
✅ You are better today than you were yesterday
✅ We all have flaws—it's part of being human
✅ When you love yourself, you can love others better
✅ Investing in yourself is the best investment you can make
Learning to love yourself is a courageous journey. It's normal to stumble or fall along the way. What
matters is that you keep going. Start today. Choose just one tip from above and practice it today. Tomorrow, add another. Slowly, you
will learn to love yourself. 
Remember: There is no one in this world exactly like you. You are unique, you have value, and you
deserve love—especially from yourself. 5.2.How to Stop Comparing Yourself to Others
Comparing yourself to others is very common in today's world, especially in the age of social media. However, this habit is extremely harmful to our mental health, happiness, and self-esteem. Why Is Comparison Dangerous?
Comparing yourself to others causes the following problems: 
- Lowers self-esteem
- Creates depression and anxiety
- Prevents us from appreciating what we have
- Makes us focus on what we lack instead of what we have
- Makes us feel like we're never good enough
- Creates unhealthy competition with others
What Makes Comparison Worse?
1. Social Media
Social media makes comparison much worse because: 
- People only show the best parts of their lives
- Photos are edited before posting
- Successes are shared, failures are hidden
- When we see others happy, we feel like we're the only ones with problems
2. In the University Environment
Comparison happens in many ways at university: 
- Comparing grades
- Comparing appearance
- Comparing number of friends
- Comparing money

- Comparing achievements
10 Ways to Stop Comparing Yourself to Others
1. Limit Social Media
Social media is the main cause of comparison. 
- Limit your daily time (for example, 30 minutes)
- Unfollow accounts that make you feel bad
- Remember that what you see on social media is not reality
- Spend time with real people instead of on social media
Practice: For one week, use social media for only 30 minutes per day. 
2. Practice Gratitude
Instead of focusing on what you don't have, focus on what you do have. 
- Every day, write down three things you're grateful for
- Appreciate your health, family, and education
- Don't forget small things (food, shelter, clean water)
Practice: Start a gratitude journal. 3. Focus on Your Own Journey
We all have different journeys. Comparing your journey to someone else's doesn't make sense. 
- Look at how far you've come compared to yesterday
- Set your own goals and follow them
- Remember that no one is perfect
Practice: Set three personal goals for this month. 
4. Identify Your Strengths
Instead of focusing on your weaknesses, know your strengths and build on them. 
- What are you good at?
- What do others admire in you?
- What skills do you have?

Practice: List 10 of your strengths and use them in the coming days. 
5. Remember Social Media Is Not Reality
What people show on social media is only the best part of their lives. 
- Behind every photo, there are unseen problems
- No one has a perfect life
- Social media shows people's best moments, not their bad times
Practice: When on social media, remind yourself: "This is only one part of their life." 
6. Turn Competition into Collaboration
Instead of competing with others, try working together. 
- Your classmates are not your competitors—they are your partners
- Share knowledge
- Seek growth together
Practice: This week, help one classmate with a subject. 
7. Celebrate Your Own Achievements
Don't just celebrate others' successes—celebrate your own too. 
- Don't forget even your small achievements
- Reward yourself when you succeed
- Record your progress
Practice: This week, celebrate one of your achievements (treat yourself to something you enjoy). 8. Accept That You Don't Need to Be Perfect
You don't need to be perfect. No one is perfect. 
- Making mistakes is part of being human
- Your weaknesses are areas where you can grow
- Some weaknesses might actually be your unique qualities
Practice: Repeat this phrase: "I'm not perfect, and that's okay." 
9. Catch Yourself When You Compare
When you feel yourself comparing, correct yourself and redirect your focus. 
- Notice when you start comparing: "I'm comparing again"
- Take a deep breath
- Redirect your focus to your own things
- Think about what you're doing
Practice: Every time you catch yourself comparing, take three deep breaths. 10. Be Your Own Best Friend
Treat yourself like you would treat a friend. - Speak to yourself with kindness
- Encourage yourself
- Don't blame yourself when you make mistakes
- When you love yourself, you can love others better
Practice: Today, write an encouraging letter to yourself. Things to Remember
✅ We all have different journeys
✅ No one is perfect
✅ What you see on social media is not reality
✅ Only track your own progress
✅ You have value just as you are
✅ Stopping comparison is a habit—it takes time
What Happens When You Stop Comparing?
When you stop comparing: - You become happier
- You can appreciate what you have
- You can focus on yourself

- You can form healthier relationships
- Your self-esteem increases
- You can enjoy the present moment
Comparing yourself to others is an easy habit to fall into in today's world. But this habit is harmful to your
happiness and self-esteem. 
Start today: 
Choose just one tip from above and practice it today. Slowly, you will learn to stop
comparing. Remember: You are unique just as you are. There is no one else in this world exactly like you. That alone
makes you special. "A flower does not compare itself to another flower. It just blooms."
 Why Is It Important to Celebrate Your Small Wins?
We often celebrate only big achievements: passing an exam, getting a job, receiving an award. But the
small wins we achieve in our daily lives play a huge role in our self-esteem, happiness, and growth.
 What Are Small Wins?
Small wins are the small but important tasks we accomplish in our daily lives.
 For example: - Waking up on time
- Making your bed
- Attending class
- Studying for 30 minutes
- Cooking a meal - Exercising
- Reading one chapter
- Doing something nice for yourself
Why Is Celebrating Small Wins Important?
1. Boosts Self-Esteem
When you celebrate your small wins: 
- You feel like "I can do things" 
- Your confidence in yourself increases
- You recognize your own value
- It gives you courage to take on bigger tasks
2. Increases Motivation
When you celebrate your small wins: 
- You feel encouraged to do more
- Your brain releases dopamine (the happiness chemical)
- Starting the next task becomes easier
- Big goals feel more achievable
3. Builds Positive Habits
When you celebrate your small wins: 
- You want to repeat good behaviors
- Positive habits are formed
- Gradually, you create big changes
- "Little by little, the mountain is conquered" becomes real
4. Improves Mental Health
When you celebrate your small wins: 
- Your happiness increases
- Anxiety decreases
- It helps prevent depression
- You feel more in control of your life
5. Helps You See Your Progress
When you celebrate your small wins: 
- You see how much you've changed
- You know where you are compared to yesterday
- When you feel hopeless, you can look back

- You feel your journey has meaning
What Happens When You Don't Celebrate Small Wins?
If you don't celebrate your small wins: 
- You always feel like you're not good enough
- You lose motivation for everything
- You struggle to find joy in life
- Big goals seem impossible and overwhelming
- You start comparing yourself to others
- Your self-esteem decreases
How to Celebrate Your Small Wins
1. Write Three Wins Daily
Every evening, write down three things you accomplished that day. 
Example: 
- I woke up on time today
- I studied for two hours
- I talked to a friend
2. Reward Yourself
When you achieve small wins, reward yourself with something small. 
Example: 
- Buy your favorite coffee
- Watch one episode of your favorite show
- Take a 30-minute break
- Eat your favorite food
3. Keep a Success Journal
Keep a special notebook and write down all your wins. 
When you feel hopeless, read it back. 4. Share with Others

Share your wins with people you trust. 
- Tell your family
- Tell a close friend
- Share on social media (if you want)
5. Acknowledge Yourself
Every day, stand in front of a mirror and acknowledge yourself. Example: - "You did well today"
- "You're better than you were yesterday"
- "You're improving" 6. Create a Visual Display
Create something visual that shows your wins. - Sticker chart - Success jar – write your wins on small papers and collect them in a jar
- Coloring – color one section for each win
What Famous People Say About Small Wins
> "Great things are done by a series of small things brought together." – Vincent Van Gogh
> "A journey of a thousand miles begins with a single step."– Lao Tzu
> "Not all of us can do great things. But we can do small things with great love." – Mother Teresa
Things to Remember
✅ Small wins lead to big wins
✅ Every big journey starts with one small step
✅ Celebrating yourself is as important as being celebrated by others

✅ You are better today than you were yesterday – celebrate that
✅ When you celebrate small wins, you gain energy to achieve big dreams
Celebrating your small wins means loving and respecting yourself. Every small step is taking you toward
your big goal. When you celebrate your small wins, you are telling yourself: "I matter. My effort has
meaning. I am improving." Start today: Tonight, write down three things you accomplished today. Tomorrow, add another three. Slowly, you will learn to celebrate yourself. Remember: Big trees grow from small seeds. Your small wins are the seeds of your future big successes. "If you cannot do great things, do small things in a great way."`,

      am: ` ✨ የዝቅተኛ እራስን የመገመት ስሜት
      
     ❤️ ራስን መውደድ እንዴት ይጀመራል?
ራስን መውደድ በአንድ ጀምበር የሚገኝ ሳይሆን በሂደት የሚገነባ ልማድ ነው። ራስን መውደድ ማለት ፍጹም ነኝ ብሎ ማሰብ ሳይሆን፤ ደካማና ጠንካራ ጎኖቻችንን አምኖ መቀበል፣ ለራስ በደግነት መናገር እና እንደምንወደው ሰው ለራሳችን እንክብካቤ ማድረግ ማለት ነው።

ራስን መውደድ ለመጀመር 10 ተግባራዊ መንገዶች፦

ለራስዎ በደግነት ይናገሩ፦ "ደደብ ነኝ" ከማለት ይልቅ "አሁን አልተሳካልኝም፣ በሚቀጥለው ግን እችላለሁ" ይበሉ።

ትናንሽ ድሎችን ያክብሩ፦ በሰዓቱ መንቃት ወይም አንድ ምዕራፍ ማንበብ ትልቅ ስኬት መሆኑን ይረዱ።

ራስን ከሌሎች ጋር ማወዳደር ያቁሙ፦ የእርስዎ ጉዞ የራሱ የሆነ መስመር እንዳለው ያስታውሱ።

ጉድለቶችዎን አምነው ይቀበሉ፦ ማንም ፍጹም አይደለም፤ ጉድለቶች የሰው ልጅነት መገለጫዎች ናቸው።

ራስዎን ይቅር ይበሉ፦ ከስህተት ይማሩ እንጂ በስህተት ውስጥ አይኑሩ።

ለጤናዎ ትኩረት ይስጡ፦ በቂ እንቅልፍ፣ ጤናማ ምግብ እና ስፖርት የራስ መውደድ መገለጫዎች ናቸው።

ከአሉታዊ ሰዎች ይራቁ፦ ብርታት የሚሰጡዎትን ሰዎች ይቅረቡ፤ ጉልበትዎን ከሚመጥጡ ይራቁ።

አዲስ ነገር ይማሩ፦ አዲስ ክህሎት ማዳበር በራስ መተማመንን ይጨምራል።

የስኬት ማስታወሻ ይያዙ፦ ያከናወኗቸውን በጎ ነገሮች መዝግበው ይያዙ።

እርዳታ ይጠይቁ፦ ሁሉንም ነገር ብቻዬን እወጣለሁ አይበሉ፤ እርዳታ መጠየቅ ጥንካሬ ነው።

🏁 ራስን ከሌሎች ጋር ማወዳደርን እንዴት ማቆም ይቻላል?
በተለይ በማህበራዊ ሚዲያ ዘመን ራስን ከሌሎች ጋር ማወዳደር ለድብርትና ለጭንቀት ይዳርጋል። ሰዎች በማህበራዊ ሚዲያ የሚያሳዩት የህይወታቸውን ምርጥ ክፍል ብቻ መሆኑን መረዳት ያስፈልጋል።

ማነጻጸርን ለማቆም 10 መንገዶች፦

ማህበራዊ ሚዲያን ይቀንሱ፦ በቀን ለ30 ደቂቃ ብቻ ይጠቀሙ።

ምስጋናን ይለማመዱ፦ የሌለዎትን ከማሰብ ይልቅ ያለዎትን 3 ነገሮች በየቀኑ ያመስግኑ።

በራስዎ ጉዞ ላይ ያተኩሩ፦ የእርስዎ ተፎካካሪ ትላንት የነበሩት እርስዎ እንጂ ሌላ ሰው አይደለም።

ውድድርን ወደ ትብብር ይቀይሩ፦ የክፍል ጓደኞችዎ ተፎካካሪ ሳይሆኑ አጋሮችዎ እንደሆኑ ያስቡ።

"ፍጹም መሆን የለብኝም" ብለው ያምኑ፦ ስህተት መስራት መብትዎ እንደሆነ ይቀበሉ።

 🏆 ትናንሽ ድሎችን ማክበር ለምን አስፈለገ?
ብዙውን ጊዜ ትላልቅ ስኬቶችን (ምርቃት፣ ስራ መያዝ) ብቻ እንጠብቃለን። 
ነገር ግን ትናንሽ ስኬቶችን ማክበር ለራስ መተማመን እና ለደስታ ቁልፍ ነው።

ትናንሽ ድሎች ምን ምን ናቸው?

በሰዓቱ መነሳት፣ አልጋ ማነጠፍ፣ ክፍል መግባት፣ ለ30 ደቂቃ ማጥናት፣ ወይም ጤናማ ምግብ ማብሰል።

ጥቅሞቹ፦

የመተማመን ስሜትን ይጨምራል፦ "እችላለሁ" የሚል ስሜት ይፈጥራል።

ተነሳሽነትን (Motivation) ይጨምራል፦ አእምሯችን የደስታ ሆርሞን እንዲያመነጭ ያደርጋል።

መልካም ልማዶችን ይገነባል፦ "ጥቂት በጥቂት ተራራ ይናዳል" የሚለውን እውነት ያረጋግጣል።

እንዴት እናክብር?

በየቀኑ ያከናወኗቸውን 3 ነገሮች ማታ ማታ ይጻፉ።

ለራስዎ ትንሽ ሽልማት ይስጡ (ለምሳሌ የሚወዱትን ቡና መጠጣት)።

በመስታወት ፊት ቆመው "ጎበዝ ነህ/ሽ" ብለው ራስዎን ያበረታቱ።

ማጠቃለያ፦
"አንድ አበባ ራሱን ከሌላ አበባ ጋር አያወዳድርም፤ ዝም ብሎ ያብባል እንጂ።" እርስዎም ልዩ ነዎት፤ ዛሬ ካከናወኗቸው 3 ትናንሽ ነገሮች መካከል አንዱን ሊነግሩኝ ይችላሉ? (ለምሳሌ፦ "ዛሬ ቁርስ በልቻለሁ" ወይም "ይህንን ጽሁፍ አንብቤ ጨርሻለሁ")። ይህን ማጋራትዎ የዛሬው የመጀመሪያው ድልዎ ነው!
      `
    }
  },
  4: {
    title: { en: "Financial Management", am: "የገንዘብ አያያዝ" },
    icon: <Wallet className="w-5 h-5" />,
    video: d1,
    pdf: "/public/financial_managment.pdf",
    detailedContent: {
      en: `How to Survive University on a Tight Budget.
      
      Financial stress is one of the biggest challenges university students face. However, learning to live wisely
on a small budget can greatly reduce your problems and help you succeed. Basic Money Management Tips
1. Create a Budget
First, track how much money you have each month and what you spend it on. How to start: 
- Write down the money you have at the beginning of the month
- Divide your expenses into three categories: 
- Fixed expenses (rent, utilities, transportation)
- Variable expenses (food, supplies)
- Savings (even a small amount, make it a habit)
2. Track Your Expenses
Many students don't know why their money runs out. 
- Write down how much you spend each day
- Small expenses (coffee, snacks) add up quickly
- After one month, review your spending and identify what you can reduce
Social Life Without Spending Much
1. Find Free Entertainment
- Free events at university (concerts, lectures, clubs)
- Walking, visiting parks
- Watching movies with friends in the dorm
2. Share Costs
- For social gatherings, do a potluck (each person brings something)
- Split bills when going out with friends
3. Use Student Discounts

- Always ask if there's a student discount at restaurants, cinemas, and for transportation
Earning Extra Money
1. Part-time Jobs
- On campus (library, cafe, research assistant)
- Off campus (shops, restaurants, tutoring)
2. Freelancing
- If you know writing, translation, graphic design, or programming
- Work on sites like Fiverr, Upwork
3. Tutoring
- Tutor younger students in subjects you're good at - Help with homework for payment
4. Make and Sell Crafts
- If you make jewelry, clothes, or art - Sell online or on campus
Living on a small budget in university is challenging, but with planning and wisdom, it is manageable. The key points:
✅ Create a budget and follow it
✅ Track your expenses
✅ Reduce unnecessary spending
✅ Find ways to earn extra income
✅ Save even a small amount
Remember: This situation is not permanent. You are studying, and things will change after graduation.
 The money management skills you learn now will benefit you for life.`,

      am: `💰 በዩኒቨርሲቲ ቆይታ በጠባብ በጀት እንዴት መኖር ይቻላል?።
      የገንዘብ እጥረት እና ተያያዥ ውጥረቶች ለብዙ የዩኒቨርሲቲ ተማሪዎች ትልቅ ፈተና ናቸው። 
      ሆኖም ግን፣ ባለዎት ጥቂት ገንዘብ በጥበብ መጠቀምን መማር ችግሮችዎን በእጅጉ የሚቀንስ ከመሆኑም በላይ ለስኬትዎ ትልቅ እገዛ ያደርጋል።

1. መሰረታዊ የገንዘብ አያያዝ ጥቆማዎች
ሀ. በጀት ያውጡ
በመጀመሪያ በየወሩ ምን ያህል ገንዘብ እንደሚገባዎትና ምን ያህል ወጪ እንደሚያወጡ ይለዩ።

በወሩ መጀመሪያ ላይ ያለዎትን ጠቅላላ ገንዘብ ይጻፉ።

ወጪዎችዎን በሦስት ይክፈሉ፡

ቋሚ ወጪዎች፡ (ቤት ኪራይ፣ የመገልገያ ክፍያዎች፣ የትራንስፖርት)

ተለዋዋጭ ወጪዎች፡ (ምግብ፣ የትምህርት ቁሳቁስ)

ቁጠባ፡ (ልማድ እንዲሆንዎ ትንሽም ቢሆን ያስቀምጡ)

ለ. ወጪዎችዎን ይከታተሉ
ብዙ ተማሪዎች ገንዘባቸው የት እንደደረሰ አያውቁም።

በየቀኑ የሚያወጡትን ገንዘብ ይመዝግቡ።

ትናንሽ ወጪዎች (ቡና፣ መክሰስ) ተደምረው ትልቅ ድምር እንደሚሆኑ ያስታውሱ።

ከአንድ ወር በኋላ ወጪዎን ይገምግሙና አላስፈላጊ የሆኑትን ይቀንሱ።

2. ያለ ብዙ ወጪ ማህበራዊ ህይወትን መምራት
ሀ. ነጻ መዝናኛዎችን ይፈልጉ

በዩኒቨርሲቲ ውስጥ የሚዘጋጁ ነጻ ኩነቶች (ኮንሰርቶች፣ ንግግሮች፣ ክለቦች)።

በእግር መጓዝ፣ ፓርኮችን መጎብኘት።

በዶርም ውስጥ ከጓደኞች ጋር ፊልም ማየት።

ለ. ወጪዎችን በጋራ መጋራት

ለማህበራዊ ስብሰባዎች "ፖትለክ" (እያንዳንዱ ሰው ምግብ ይዞ የሚመጣበት) ዘዴን ይጠቀሙ።

ከጓደኞች ጋር ወደ ውጭ በሚወጡበት ጊዜ ሂሳብን ይጋሩ።

ሐ. የተማሪዎች ቅናሽን ይጠቀሙ

ምግብ ቤቶች፣ ሲኒማ ቤቶችና የትራንስፖርት አገልግሎቶች ላይ የተማሪ ቅናሽ መኖሩን ሁልጊዜ ይጠይቁ።

3. ተጨማሪ ገንዘብ ማግኛ መንገዶች
የትርፍ ሰዓት ስራዎች፡ በግቢ ውስጥ (ቤተ-መጻሕፍት፣ ካፌ፣ የምርምር ረዳት) ወይም ከግቢ ውጭ (ሱቆች፣ ሆቴሎች፣ የግል ትምህርት/ቱቶሪንግ)።

የፍሪላንስ ስራዎች (Freelancing): የጽሁፍ፣ የትርጉም፣ የግራፊክ ዲዛይን ወይም የፕሮግራም ችሎታ ካለዎት በኦንላይን (እንደ Fiverr, Upwork) ይስሩ።

የግል ትምህርት መስጠት (Tutoring): ጎበዝ የሆኑባቸውን ትምህርቶች ለታናናሽ ተማሪዎች በማስተማር ገቢ ያግኙ።

እደ-ጥበብ ሰርቶ መሸጥ፡ ጌጣጌጥ፣ አልባሳት ወይም ጥበቦችን የሚሰሩ ከሆነ በኦንላይን ወይም በግቢ ውስጥ ይሽጡ።

ማጠቃለያ
በዩኒቨርሲቲ ውስጥ በትንሽ በጀት መኖር ፈታኝ ቢሆንም፣ በዕቅድና በጥበብ ከተመሩ የሚቻል ነው:: ዋና ዋና ነጥቦች፡

✅ በጀት ያውጡና ይከተሉት

✅ ወጪዎን ይከታተሉ

✅ አላስፈላጊ ወጪዎችን ይቀንሱ

✅ ተጨማሪ ገቢ የሚያገኙበትን መንገድ ይፈልጉ

✅ ትንሽም ቢሆን መቆጠብን ይለማመዱ

ያስታውሱ፡ ይህ ሁኔታ ጊዜያዊ ነው። አሁን እየተማሩ ነው፤ ከምርቃት በኋላ ነገሮች ይቀየራሉ። አሁን የሚማሩት የገንዘብ አያያዝ ጥበብ ግን ለዘላለም ይጠቅምዎታል።`
    }
  },
  5: {
    title: { en: "SOCIAL LIFE", am: "ማህበራዊ ህይወት" },
    icon: <Users className="w-5 h-5" />,
    video: e1,
    pdf: "/public/social_life.pdf",
    detailedContent: {
      en: `How to Identify and Avoid Toxic Friendships in
University.
     
Making friends in university is important. However, some friendships can harm us more than help us.
 Knowing how to identify these toxic relationships and removing ourselves from them is essential for our
mental health and well-being. What is a Toxic Friendship?
A toxic friendship is a relationship where the harm outweighs the benefit—where you experience
emotional, mental, or sometimes even physical damage. Instead of feeling supported and uplifted, you
feel drained, anxious, or bad about yourself. Signs of a Toxic Friendship
1. Constant Put-Downs
Your friend consistently diminishes you by: 
- Minimizing your achievements ("You were just lucky, you're not really qualified")
- Embarrassing you in front of others
- Mocking your appearance, clothes, or lifestyle
- Making "jokes" about your weaknesses
Example: When you wear new clothes, they say "That doesn't look good on you," or when you get a good
grade, they say "The exam was easy anyway." 2. Always Taking, Never Giving
- They only remember you when they need something
- When you need them, they're never available
- They constantly borrow money, notes, or other things but never return or repay
- They use your time and resources but never share theirs
3. Jealousy
Your friend is unhappy when: - You achieve something
- You make other friends

- You succeed academically
- You're happy in your social life
Instead of celebrating your success, they try to diminish or downplay it. 
4. Gossip & Backstabbing
- Talking about you behind your back
- Sharing your secrets with others
- Spreading rumors about you
- Saying one thing to your face and another when you're not there
5. Manipulation
- Making you do things you don't want to do
- Blaming you when they make mistakes
- Using your emotions against you ("If you loved me, you would...")
- Making you feel guilty for their problems
6. No Respect for Boundaries
- They don't accept when you say no
- They don't respect your personal space
- They show up when you're sick or studying, demanding your attention
- They only care about their own needs, not yours
7. Always Right
- They never admit when they're wrong
- They never apologize
- Everything must be done their way
- They don't listen to your opinions
8. Invalidating Your Feelings
- When you're upset, they say "Why are you overreacting?"
- When you're sad, they say "Stop crying" or "You're too sensitive" 
- They dismiss your emotions as unimportant or excessive
- They tell you to "get over it" or "calm down" The Damage Toxic Friendships Can Cause
- Decreased self-confidence
- Depression and anxiety
- Lower academic performance
- Withdrawing from other social connections
- Self-doubt - Constant fatigue and lack of energy
- Physical symptoms (headaches, stomach aches, sleep problems)
How to Protect Yourself
1. Recognize the Signs
Know the signs listed above. If a friend displays many of these behaviors, it's time to examine the
relationship. 
2. Trust Your Feelings
Pay attention to how you feel after being with someone: 
- Do you feel happy or exhausted?
- After talking to them, do you feel relief or more anxiety?
- When you're around them, can you be yourself, or do you have to be careful?
Your gut feeling is often right. 3. Set Boundaries
- Clearly state what you will and won't accept - Learn to say "no"
- Distance yourself from people who can't respect your boundaries
- Firmly maintain your boundaries
For example:"Sorry, I need to study now. We can talk later," or "I don't want to do that." 
4. Speak Up
When a friend does something that bothers you: 
- Tell them directly when something troubles you
- Explain your feelings using "I" statements: 
"When you say that, I feel..."
- See if they're willing to change
Sometimes people don't realize what they're doing. But if they refuse to change after you've spoken up, it's time to distance yourself. 5. Create Distance
To end a toxic friendship, you can gradually create distance: 
- Don't respond to their messages immediately
- Don't make plans to be together
- Make excuses to avoid commitments
- Slowly reduce contact
6. Have a Direct Conversation
Sometimes you need to clearly end the relationship: 
- Talk to them calmly
- Explain your feelings without blaming
- Tell them why you want to end the relationship
- Then cut off contact
For example:"I'm not happy in this friendship.
 My feelings often aren't respected, so I've decided to distance myself." 
7. Build a Support System
- Strengthen your healthy friendships
- Connect with family
- Make new, positive friends
- Talk to a counselor or mental health professional if needed

8. Practice Self-Care
- Take time to heal after leaving a toxic relationship
- Do things you enjoy
- Invest in yourself
- Speak positively to yourself
What Healthy Friendship Looks Like
Healthy friendships have these qualities:
✅ Respect They respect your opinions, time, and boundaries
✅ Trust You can share secrets without fear
✅ Support– They're there when you need them
✅ Equality– Giving and taking is balanced
✅ Joy You're happy when you're together
✅ Freedom– You can be yourself
✅ Encouragement– They want you to succeed
Action Plan
Step 1: Evaluate
- List all your friendships
- Compare them with the toxic signs above
- Identify which relationships might be unhealthy
Step 2: Decide
- Which friendships might be fixable?
- Which ones need to end?
- Decide what action to take
Step 3: Take Action
- Set boundaries

- Create distance
- Have direct conversations if needed
- Build new, healthy connections
Step 4: Monitor
- Notice how you feel after your decisions
- Confirm that your choices were right - Make adjustments if necessary
What to Do When You Feel Lonely
Loneliness is one of the most common feelings university students experience. 
You can be surrounded by people and still feel alone. 
The good news is that loneliness is temporary, and there are many ways to cope with it.
 What Is Loneliness?
Loneliness isn't the same as being alone. Loneliness is a feeling of isolation even when you're around
others. You might be physically close to people but feel emotionally distant.
Loneliness can cause: 
- Sadness or depression
- Loss of appetite or overeating
- Trouble sleeping or sleeping too much
- Difficulty concentrating
- Withdrawing further from others
15 Ways to Cope with Loneliness
1. Acknowledge Your Feelings
Accepting that you feel lonely is the first step. 
- Don't blame yourself—feeling lonely isn't weakness
- Don't panic thinking "How can I feel lonely with so many people around?"
- Remember this feeling is temporary

2. Be Your Own Friend
Building a good relationship with yourself helps combat loneliness. 
- Talk to yourself kindly
- Do things you enjoy, even alone
- Reward yourself for small achievements
- Learn to enjoy your own company
3. Connect with Family
Family is always there to support you. - Call your parents or siblings
- Use video calling apps (Telegram, Zoom)
- Tell them how you're feeling
- Find comfort in remembering home-cooked food or familiar things
4. Exercise
Physical activity releases endorphins (happiness hormones) and improves your mood. 
- Go for a walk or run
- Do yoga or stretching
- Play sports
- Go to the gym
5. Learn New Things
Learning new things distracts your mind from loneliness. 
- Start learning a new language (using apps like Duolingo)
- Watch educational videos on topics you enjoy
- Learn a new skill (drawing, music, cooking)
- Read books
6. Volunteer
Helping others takes your mind off your own problems. pg. 20
- Volunteer in your local community
- Join volunteer clubs at university
- Visit elderly people or those in need
- Helping others reminds you of your own value
7. Get a Pet
Pets, especially dogs or cats, can help ease loneliness. 
- Animals return your love unconditionally
- Caring for them gives you responsibility and purpose
- If you have a dog, daily walks help you connect with others
8. Listen to Music or Podcast
Music and podcasts can help ease loneliness.
- Listen to uplifting music
- Find podcasts about topics you enjoy
- Hearing human voices can reduce feelings of isolation
- Discover and enjoy new songs
9. Fix Your Sleep Schedule
Lack of sleep or oversleeping can make loneliness worse. 
- Try to sleep and wake at the same time each day
- Avoid screens before bedtime
- Read a book or meditate instead
10. Use Social Media Wisely
Social media can sometimes make loneliness worse. 
- Seeing others appear happy can make you sad
- Limit time spent on social media
- Try to connect with real people in person instead
- Focus on your own life rather than comparing with others

11. Eat Healthy Food
Food affects your mood. - Try to eat healthy meals
- Cook good food for yourself
- Eat with friends when possible
- Share food from home with others
12. Try to Make New Friends
Making new connections can help ease loneliness. - Join clubs and organizations
- Talk to people in your classes
- Attend university events
- Get involved in volunteer work
13. Talk to a Counselor
If loneliness is severe and persistent: - Use your university's counseling services
- Talking to a professional helps
- Asking for help isn't weakness
- Many universities offer free counseling
14. Create a Routine
A daily routine gives you structure and meaning. - Wake up at the same time each day
- Schedule time for studying, rest, and social activities
- Set and achieve small goals
- Routine helps combat loneliness
15. Meditation and Prayer
Meditation and prayer can bring inner peace. 
- Practice meditation for 5-10 minutes daily
- Use apps like Headspace or Calm
- If you're religious, prayer can bring comfort - Learn to be at peace with yourself
Things to Remember
✅ Loneliness is temporary—it will pass
✅ Many people feel the same way—you're not alone
✅ Feeling lonely doesn't mean you're worthless
✅ Small steps make big differences
✅ Asking for help isn't weakness
When to Seek Help
You should seek help if loneliness is accompanied by: - Prolonged sadness or hopelessness
- Thoughts of harming yourself or others
- Inability to sleep or sleeping too much for long periods
- Not eating or overeating
- Withdrawing from all social contact
Your university counseling center is always ready to help. Although loneliness is a difficult feeling, there are many ways to cope with it. The key is to take small
steps and not lose hope. Remember: Many students at university feel the same way. You are not alone, and this feeling will pass.
      `,

      am: `በዩኒቨርሲቲ ውስጥ ጎጂ ጓደኞችን (Toxic Friends) እንዴት መለየትና ማስወገድ ይቻላል?.
      በዩኒቨርሲቲ ውስጥ ጓደኛ ማፍራት በጣም አስፈላጊ ነው። ሆኖም አንዳንድ ጓደኝነቶች ከጥቅማቸው ይልቅ ጉዳታቸው ያመዝናል። እነዚህን ጎጂ ግንኙነቶች ለይቶ ማወቅና ራስን ማራቅ ለአእምሮ ጤና እና ለደህንነትዎ ወሳኝ ነው።

ጎጂ ጓደኝነት (Toxic Friendship) ምንድን ነው?
ጥቅሙ ከጉዳቱ የሚያንስበት፣ ስሜታዊ፣ አእምሮአዊ ወይም አንዳንዴም አካላዊ ጉዳት የሚያደርስብዎ ግንኙነት ነው። ደስተኛና ብርቱ ከመሆን ይልቅ የድካም፣ የጭንቀት ወይም የዝቅተኝነት ስሜት እንዲሰማዎት ያደርጋል።

የጎጂ ጓደኝነት ምልክቶች
ሁልጊዜ ዝቅ ማድረግ፦ ስኬትዎን በማንኳሰስ ("እድለኛ ሆነህ ነው እንጂ አትችለውም")፣ በሰው ፊት በማሳፈር ወይም በኑሮ ዘይቤዎ ላይ "ቀልድ" በሚመስሉ ስድቦች እርስዎን ዝቅ ማድረግ።

ተቀባይ እንጂ ሰጪ አለመሆን፦ ጉዳይ ሲኖራቸው ብቻ ማስታወስ፣ እርስዎ ሲፈልጓቸው ግን አለመገኘት፣ እና ሁልጊዜ ገንዘብ ወይም ንብረት ተበድረው አለመመለስ።

ቅናት፦ የእርስዎን ስኬት ወይም አዲስ ጓደኛ ማፍራት አብሮ ከመደሰት ይልቅ ለማጣጣል መሞከር።

ሐሜትና ክህደት፦ በሌሉበት ማማት፣ ሚስጥርዎን ለሌላ አሳልፎ መስጠት እና ወሬ ማናፈስ።

መቆጣጠር (Manipulation)፦ የማይፈልጉትን ነገር እንዲያደርጉ ተጽዕኖ ማሳደር እና ለራሳቸው ስህተት እርስዎን ተጠያቂ ማድረግ።

ወሰንን አለማክበር፦ "አይሆንም" ሲሉ አለመቀበል፣ ለጥናት ወይም ለእረፍት የሚሆን የግል ጊዜዎን አለማክበር።

ሁልጊዜ "እኔ ልክ ነኝ" ባይነት፦ ስህተትን አለማመን፣ ይቅርታ አለመጠየቅ እና ሁሉንም ነገር በራሳቸው መንገድ ብቻ መፈለግ።

ስሜትን ማጣጣል፦ ሲከፋዎት "ለምን ትጨነቃለህ?" ወይም "በጣም ስሜታዊ ነህ" በማለት ስሜትዎን እንደ ቀላል ነገር ማየት።

ራስን እንዴት መጠበቅ ይቻላል?
ምልክቶቹን ይለዩ፦ ከላይ የተጠቀሱት ምልክቶች የሚታዩበት ከሆነ ግንኙነቱን መመርመር ይገባል።

ስሜትዎን ያዳምጡ፦ ከሰውየው ጋር ከተገናኙ በኋላ የድካም ወይስ የደስታ ስሜት ይሰማዎታል? ውስጣዊ ስሜትዎ ብዙ ጊዜ እውነት ነው።

ወሰን ያብጁ፦ የማይቀበሉትን ነገር በግልጽ ይናገሩ። "አይ" ማለትን ይለማመዱ።

በግልጽ ይነጋገሩ፦ የሚረብሽዎትን ነገር በ "እኔ" መግለጫ ይንገሯቸው። (ለምሳሌ፦ "እንዲህ ስትል እኔ ቅር ይለኛል")። 
ለመለወጥ ፈቃደኛ ካልሆኑ መራቅ ይሻላል።

ቀስ በቀስ መራቅ፦ መልእክት ወዲያው አለመመለስና ቀጠሮዎችን በመቀነስ ግንኙነቱን ማቀዝቀዝ።

ድጋፍ ያግኙ፦ ከጥሩ ጓደኞችና ቤተሰብ ጋር ያለዎትን ግንኙነት ያጠናክሩ። አስፈላጊ ከሆነም ከባለሙያ ጋር ይማከሩ።

3.2. ብቸኝነት ሲሰማዎት ምን ማድረግ አለብዎት?
ብቸኝነት በዩኒቨርሲቲ ተማሪዎች ዘንድ በጣም የተለመደ ስሜት ነው። 
በሰዎች ተከበውም ቢሆን ብቸኝነት ሊሰማዎት ይችላል። 
ዋናው ቁምነገር ይህ ስሜት ጊዜያዊ መሆኑን ማወቅ ነው።

ብቸኝነትን ለመቋቋም የሚረዱ 15 መንገዶች
ስሜትዎን አምነው ይቀበሉ፦ ብቸኝነት መሰማት ድክመት አይደለም፤ ጊዜያዊ መሆኑን ይረዱ።

ለራስዎ ጓደኛ ይሁኑ፦ ራስዎን በደግነት ይያዙ፣ ብቻዎን ቢሆኑም የሚወዱትን ነገር ያድርጉ።

ከቤተሰብ ጋር ይገናኙ፦ በስልክ ወይም በቪዲዮ ደውለው ስሜትዎን ያጋሩ።

አካላዊ እንቅስቃሴ ያድርጉ፦ የእግር ጉዞ ወይም ስፖርት ስሜትን የሚያድሱ ሆርሞኖችን ያመነጫል።

አዳዲስ ነገሮችን ይማሩ፦ አዲስ ቋንቋ ወይም ክህሎት መማር አእምሮዎ በብቸኝነት ላይ እንዳያተኩር ያደርጋል።

በበጎ ፈቃድ ስራዎች ይሳተፉ፦ ሌሎችን መርዳት የራስዎን ዋጋ እንዲረዱ ያደርጋል።

የቤት እንስሳትን ይንከባከቡ፦ እንስሳት ያለ ምንም ቅድመ ሁኔታ ፍቅር ይሰጣሉ።

ሙዚቃ ወይም ፖድካስት ያዳምጡ፦ የሰው ድምጽ መስማት የብቸኝነት ስሜትን ይቀንሳል።

የእንቅልፍ ሰዓትዎን ያስተካክሉ፦ በቂ እንቅልፍ ማጣት ስሜትን ያዛባል።

ማህበራዊ ሚዲያን በጥንቃቄ ይጠቀሙ፦ የሌሎችን "ደስተኛ" ህይወት አይተው ከራስዎ ጋር አያወዳድሩ።

ጤናማ ምግብ ይመገቡ፦ ምግብ በስሜታችን ላይ ተጽዕኖ አለው።

አዳዲስ ጓደኞችን ለማፍራት ይሞክሩ፦ በተለያዩ ክለቦችና ኩነቶች ላይ ይሳተፉ።

ከአማካሪ ጋር ይነጋገሩ፦ ስሜቱ ካየለ በዩኒቨርሲቲው የሚገኙ የነጻ የምክር አገልግሎቶችን ይጠቀሙ።

የእለት ተእለት መርሃ ግብር ያውጡ፦ ስራ ማከናወን ትርጉም ያለው ህይወት እንዲሰማዎት ያደርጋል።

ጸሎትና ሜዲቴሽን፦ የውስጥ ሰላም ለማግኘት ይረዳሉ።
ያስታውሱ፦ ብቸኝነት የሁሉንም ሰው በር ያንኳኳል፤ እርስዎ ብቻ አይደሉም። እርዳታ መጠየቅ ደግሞ ጥንካሬ እንጂ ድክመት አይደለም። `
    }
  },
  6: {
    title: { en: "MENTAL HEALTH BASIC", am: "መሰረታዊ የአእምሮ ጤና መረጃዎች" },
    icon: <Brain className="w-5 h-5" />,
    video: f1,
    pdf: "/public/MENTAL_HEALTH_BASICS.pdf",
    detailedContent: {
      en: `What is Depression? What Are Its Symptoms?
      Depression is one of the most common mental health challenges university students face. Many people
use the word "depression" casually to describe sadness or disappointment. However, depression is much
more serious and complex than ordinary sadness. It is a real medical condition that requires understanding
and proper treatment. What is Depression?
Depression is a serious mental health disorder that affects how you feel, think, and handle daily activities. 
It includes: 
- Persistent feelings of sadness, emptiness, or hopelessness
- Loss of interest in activities you once enjoyed
- Difficulty functioning in daily life
Depression is not a sign of weakness or a character flaw. It is a medical condition—just like diabetes or
heart disease—that requires proper treatment and support. Common Signs and Symptoms of Depression
Depression can look different in different people. If you experience several of the following symptoms for
at least two weeks it may be depression:
Emotional Symptoms
1. Persistent sadness– Feeling sad, empty, or tearful for no clear reason
2. Hopelessness– Feeling like things will never get better; losing faith in the future
3. Emptiness– Feeling numb or like nothing matters anymore
4. Guilt and worthlessness– Blaming yourself for things; feeling like you're not good enough
5. Irritability– Getting angry or frustrated easily over small things
6. Loss of interest– No longer enjoying hobbies, friends, sports, or activities you used to love
Physical Symptoms
7. Sleep changes– Trouble sleeping (insomnia) or sleeping too much (hypersomnia)
8. Appetite changes– Eating too much or too little; significant weight gain or loss
9. Fatigue– Feeling tired all the time; having no energy
10. Unexplained aches– Headaches, stomach aches, back pain without a clear physical cause
11. Slowed movement or agitation– Moving or speaking more slowly than usual, or feeling restless and
unable to sit still
Cognitive Symptoms (Thinking)

12. Difficulty concentrating– Trouble focusing on studies, reading, or even watching a movie
13. Memory problems– Forgetting things more often than usual
14. Negative thinking– Always expecting the worst; seeing no bright side
15. Thoughts of death or suicide– Thinking about death, dying, or harming yourself
Social Symptoms
16. Withdrawing from others– Avoiding friends and family; isolating yourself
17. Avoiding activities– Skipping classes, clubs, or social events you used to attend
18. Loneliness– Feeling alone even when you're with people
How Depression May Show Up in University Students
In university students, depression might look like:
 Dropping grades– Failing exams, missing assignments, falling behind
 Skipping class– Frequently absent; staying in bed instead of attending lectures
 Isolating from friends– Avoiding roommates; not responding to messages
 Poor self-care– Not bathing, not cleaning room, wearing same clothes for days
 Turning to alcohol or drugs– Using substances to cope with emotional pain
What Causes Depression?
Depression can result from a combination of factors:
1. Biological factors– Imbalance of brain chemicals (like serotonin and dopamine)
2. Genetics– Depression that runs in families
3. Environmental factors– Stressful life events (loss of a loved one, breakup, financial problems)
4. Chronic stress– Long-term pressure from studies, work, or relationships
5. Medical conditions– Some physical illnesses can trigger depression
What You Can Do to Cope with Depression
Things You Can Try Yourself
1. Connect with people– Don't isolate yourself. Reach out to friends or family, even when it feels hard. 
2. Move your body– Exercise releases endorphins. Even a 15-20 minute walk daily can help. 
3. Eat well– Try to eat regular, balanced meals. Food affects mood. 
4. Prioritize sleep– Aim for 7-8 hours of sleep each night. 
5. Avoid alcohol and drugs– They make depression worse, not better.
 6. Set small goals– Accomplish one small thing each day (shower, make your bed, read one page). 
 7. Be kind to yourself– Depression is not your fault. Don't blame yourself. When to Seek Professional Help
You should seek help from a counselor or doctor if: - Symptoms last more than two weeks
- Depression is affecting your studies, work, or relationships
- You're thinking about harming yourself or others
- You're using alcohol or drugs to cope
Where to Find Help
On Campus
- University Counseling Center– Free and confidential services for students
- Health Clinic– To check for physical causes of symptoms
- Academic advisors or trusted professors– They can guide you to resources
Anxiety: When Does It Become a Problem?
Anxiety is a very common feeling among university students. However, it is essential to understand the
difference between normal anxiety and an anxiety disorder. What is Anxiety?
Anxiety is the body's natural response to danger or stress.
 A little bit of anxiety can actually be helpful: 
 - It motivates us to prepare for exams
- It protects us from danger
- It keeps us alert - It helps us perform at our best when needed
The Difference Between Normal Anxiety and an Anxiety Disorder
Normal Anxiety Anxiety Disorde
Linked to a specific event (e.g., an exam) Happens without reason or is out of proportion to the
situation
Lasts for a short time Lasts for a long time (more than 6 months)
Does not disrupt daily life Disrupts daily life (studies, relationships)
Can be controlled Cannot be controlled, or is very difficult to control
Goes away after the event is over Happens constantly or repeatedly
Symptoms of an Anxiety Disorder
Anxiety disorders can be recognized through three main categories of symptoms:
1. Physical Symptoms
 Racing heart– Heart beating fast
 Shortness of breath– Feeling like you can't breathe
 Sweating– Sweating for no apparent reason
 Trembling– Shaking hands or legs
 Stomach problems– Nausea, diarrhea
 Muscle tension– Especially in the neck and shoulders
 Headaches– Constant headaches
 Fatigue– Feeling tired all the time
2. Cognitive Symptoms (Thinking)
 Constant worrying– Worrying about everything
 Overthinking– Thinking too much about even small things
 Negative thinking– Always expecting the worst
 Difficulty concentrating– Can't focus
 Memory problems– Forgetting things
 Catastrophizing– Seeing small risks as major dangers
3. Behavioral Symptoms
 Avoidance– Avoiding places or situations that cause anxiety
 Social withdrawal– Isolating yourself from people
 Sleep problems– Can't sleep or waking up early
 Restlessness– Can't sit still; constantly moving
 Substance use– Using alcohol or drugs to cope with anxiety
Common Types of Anxiety Disorders in University Students
1. Generalized Anxiety Disorder (GAD)
- Excessive worry about many things (studies, money, health, family)
- Inability to control the worry
- At least 3 of the symptoms listed above
2. Social Anxiety Disorder
- Intense fear of being seen or judged by others
- Fear of speaking in class, talking in groups, or making new friends
- Avoiding social situations
3. Panic Attacks
- Sudden intense fear
- Racing heart, shortness of breath, chest pain
- Feeling like you might die or lose control - Lasts 10-20 minutes
- Can happen at any time
4. Test Anxiety
- Extreme anxiety before and during exams
- Forgetting what you studied
- Performing poorly even when you prepared well
When Does Anxiety Become a Problem?
Anxiety becomes a problem in the following situations:
1. When It Is Out of Proportion
For example: Intense fear about giving a short presentation, or staying up all night worrying about a small
assignment. 2. When It Lasts a Long Time
Anxiety that lasts more than 6 months may be an anxiety disorder.
3. When It Disrupts Daily Life
- If you can't attend class
- If you can't study
- If you can't be with friends
- If you can't sleep or eat properly
4. When You Can't Control It
You try to manage the anxiety, but nothing works. 
5. When It Causes Other Problems
- Depression
- Isolation from people
- Using alcohol or drugs to cope
- Physical health problems
Ways to Cope with Anxiety
Things You Can Do Yourself
1. Deep breathing– Breathe in slowly and out slowly. Do this for a few minutes. 
2. Exercise– Even a 30-minute walk each day can help. 
3. Reduce caffeine– Coffee and other caffeinated drinks can make anxiety worse. 
4. Meditation– Use apps like Headspace or Calm.
 5. Talk to someone– Share your feelings with someone you trust.
  6. Set small goals– Break big tasks into smaller steps. 
  7. Face your fears gradually– Slowly confront the things you avoid. When to Seek Professional Help
You should seek help from a professional if:
o Your anxiety is disrupting your daily life
o It has lasted a long time (more than 6 months)
o You are experiencing panic attacks
o You are thinking about harming yourself
o You are using alcohol or drugs to cope
Where to Find Help
On Campus
- University Counseling Center – Free and confidential services
- Health Clinic– To check for physical symptoms
In Ethiopia
- Amanuel Hospital– Specialized mental health hospital - St. Paul's Hospital– Psychiatry department - Religious or spiritual advisors– If faith is part of your life
Things to Remember
✅ A little anxiety is normal and even helpful
✅ Anxiety is not a sign of weakness
✅ You are not alone – many students experience the same thing
✅ Anxiety disorders are treatable
✅ Asking for help is a sign of strength, not weakness
Anxiety is living tomorrow's trouble today. But each day has enough trouble of its own."**
Asking for Help Is Not a Sign of Weakness – When
and Where to Seek Help
During university, we face many challenges. Sometimes we can solve these problems on our own. But
sometimes, we need to ask others for help. Asking for help is not a sign of weakness—it is a sign of
strength. Why Is Asking for Help Important?
Common Misconceptions That Prevent Students from Asking for Help
Many students avoid asking for help because of these beliefs:
o "Others will think I'm weak." 
o "I should solve my own problems." o "No one can help me anyway." o "My problem isn't that serious; others have bigger issues." o "I don't want to talk about it." These Beliefs Are Wrong:
✅ Asking for help is not weakness—it's self-awareness and self-care
✅ Everyone needs help sometimes
✅ No matter how small your problem seems, you deserve support
✅ Just talking can bring relief
✅ There are people at your university who want to help you
When Should You Ask for Help?
1. When Your Emotions Feel Overwhelming
- Persistent sadness or hopelessness
- Anxiety that lasts more than two weeks
- Feeling worthless or like a failure
- Extreme anger or irritability
2. When Your Daily Life Is Affected
- Can't attend classes or study
- Can't sleep or eat properly (or eating/sleeping too much)
- Neglecting your personal hygiene
- Withdrawing from friends and family
3. When Your Relationships Are Suffering
- Frequent conflicts with family or friends
- Isolating yourself, staying alone all the time
- Difficulty trusting others
- Being in a toxic relationship
4. When You Have Physical Symptoms
- Unexplained headaches, stomach aches
- Constant fatigue
- Loss of appetite or overeating
- Sleep problems
5. When You Notice Dangerous Behaviors
- Starting or increasing alcohol or drug use
- Thinking about harming yourself or others
- Engaging in risky behaviors
6. After a Traumatic Event
- Losing a loved one
- Experiencing or witnessing a traumatic event (accident, violence)
- A painful breakup
Where Can You Ask for Help?
On Campus
1. University Counseling Center
Most universities offer free counseling services for students.  Free of charge
 Confidential– No one else will know
 Trained professionals provide the service
 You can get individual counseling or group counseling
2. Health Clinic
Some mental health issues may be linked to physical health.  Get a physical check-up
 Consult a doctor
 Get referrals if needed
3. Academic Advisors
 They can help with academic problems

 They can guide you to other support services
4. Trusted Professors or Staff
 They can be good listeners and mentors
 They can direct you to the right support services
5. Student Clubs and Organizations
 Clubs like the Psychology Student Association
 Peer support groups
Outside the University (In Ethiopia)
1. Amanuel Hospital
Located in Addis Ababa, this is Ethiopia's main specialized mental health hospital. - Psychiatric evaluation and treatment - Counseling services
- Emergency care
2. Other Hospitals
Many government and private hospitals have psychiatry departments: - St. Paul's Hospital - Bethel Hospital - Addis Ababa University Medical Center
3. Private Psychologists/Psychiatrists
- Private practitioners in Addis Ababa and other cities
- Requires payment - You can search online or ask on social media
4. Spiritual/Religious Advisors
If you have faith: - Priests, pastors, imams, or other spiritual leaders
- Faith-based counseling
- Places of prayer and spiritual support
How to Ask for Help
Phrases You Can Use When Asking for Help for the First Time
- "I'm looking for someone I can talk to."
- "I've been struggling lately. Where can I get help?"
- "I need information about counseling services."
- "Who can I talk to?" What You Can Say to a Counselor
- "I think I've been really anxious lately."
- "I can't focus, and my grades are dropping."
- "I feel tired all the time and don't want to do anything."
- "I don't want to be around people; I just stay alone."
- "I've been thinking about hurting myself." (If you're thinking this, tell them immediately)
Barriers to Asking for Help and How to Overcome Them
Barrier How to Overcome It "Others will think I'm weak." Remember: asking for help is strength
"My problem isn't that serious." Every problem deserves attention
"No one can help me." Professionals can help—it's their job
"I don't want to talk about it." You can open up gradually
"It won't be confidential." Counselors are bound by confidentiality
What to Remember When Asking for Help
✅ Asking for help is not weakness—it's a sign of strength
✅ Everyone needs help sometimes
✅ There are people at your university who want to help you
✅ No matter how small your problem seems, you deserve support
✅ The sooner you ask for help, the sooner you'll find solutions
✅ Your mental health is just as important as your physical health
Asking for help means recognizing that you don't have to go through things alone. We humans are made
to live in community, and sometimes that community is exactly what we need most. Remember: When things get hard, don't be afraid to reach out. There are people at your university who
want to help you. You are not alone. 
     `,
      am: `ድብርት (Depression) ምንድን ነው? ምልክቶቹስ?
      ድብርት ተራ የሀዘን ስሜት ሳይሆን፣ የሰውን ስሜት፣ አስተሳሰብ እና የእለት ተእለት እንቅስቃሴ የሚጎዳ ከባድ የጤና እክል ነው። እንደ ስኳር ወይም የልብ ህመም ሁሉ ተገቢውን ህክምና እና ድጋፍ የሚሻ የህክምና ሁኔታ ነው።

የድብርት ዋና ዋና ምልክቶች
አንድ ሰው ለሁለት ሳምንታት እና ከዚያ በላይ የሚከተሉት ምልክቶች ከታዩበት በድብርት እየተጠቃ ሊሆን ይችላል፡

የስሜት ምልክቶች፦ የማያቋርጥ የሀዘን ስሜት፣ የተስፋ መቁረጥ፣ የባዶነት ስሜት፣ የጥፋተኝነት ስሜት እና ለነገሮች የነበረንን ፍላጎት ማጣት።

የአካል ምልክቶች፦ የእንቅልፍ መዛባት (በጣም መተኛት ወይም እንቅልፍ ማጣት)፣ የምግብ ፍላጎት መቀየር፣ ከፍተኛ የድካም ስሜት፣ እና ምክንያቱ ያልታወቀ የራስ ወይም የሆድ ህመም።

የአስተሳሰብ ምልክቶች፦ ትኩረት የማድረግ ችግር፣ ነገሮችን የመርሳት ሁኔታ፣ ሁልጊዜ መጥፎውን ብቻ ማሰብ እና ስለ ሞት ወይም ራስን ስለ መጉዳት ማሰብ።

ማህበራዊ ምልክቶች፦ ከሰው መራቅ፣ ከጓደኞችና ቤተሰብ ጋር መገለል እና ትምህርት መቅረት።

ምን ማድረግ ይቻላል?
ከሰው ጋር ይገናኙ፣ አይገለሉ፡፡

አካላዊ እንቅስቃሴ ያድርጉ (በቀን 20 ደቂቃ የእግር ጉዞ)፡፡

አልኮልና አደንዛዥ እጾችን ያስወግዱ (ሁኔታውን ያባብሳሉ)፡፡

እርዳታ የሚፈለግበት ጊዜ፦ ምልክቶቹ ከሁለት ሳምንት በላይ ከቆዩ፣ በትምህርትዎና በኑሮዎ ላይ እንቅፋት ከሆኑ ወይም ራስን የመጉዳት ሃሳብ ከመጣ በአስቸኳይ ባለሙያ ያማክሩ።

4.2. ጭንቀት (Anxiety)፦ መቼ ነው ችግር የሚሆነው?
ጭንቀት ለሰው ልጅ ተፈጥሯዊ ምላሽ ነው፤ ጥቂት ጭንቀት ለፈተና እንድንዘጋጅ ይረዳል። ነገር ግን ጭንቀቱ ከቁጥጥር ውጭ ሲሆን ወደ "የጭንቀት መታወክ" (Anxiety Disorder) ይቀየራል።

የጭንቀት መታወክ ምልክቶች
አካላዊ፦ የልብ ምት መጨመር፣ የትንፋሽ ማጠር፣ ላብ፣ መንቀጥቀጥ እና የጡንቻ መወጠር።

አእምሮአዊ፦ ሁልጊዜ መጨነቅ፣ ነገሮችን አጋንኖ ማየት (Catastrophizing) እና ትኩረት ማጣት።

ባህሪያዊ፦ ሰዎችንና ቦታዎችን መሸሽ፣ እንቅልፍ ማጣት እና እረፍት ማጣት።

ጭንቀት መቼ ነው ችግር የሚሆነው?
ከሁኔታው ጋር የማይመጣጠን ከፍተኛ ጭንቀት ሲሆን።

ከ6 ወር በላይ ሲቆይ።

የእለት ተእለት ህይወትዎን (ትምህርት፣ እንቅልፍ፣ ማህበራዊ ህይወት) ሲያውክ።

መፍትሄዎች
በጥልቀት መተንፈስ (Deep breathing)።

የካፌይን (ቡና) አጠቃቀምን መቀነስ።

ትልልቅ ስራዎችን ወደ ትናንሽ ደረጃዎች በመከፋፈል መስራት።

4.3. እርዳታ መጠየቅ የድክመት ምልክት አይደለም
ብዙ ተማሪዎች "ሰው በቃኝ ይለኛል" ወይም "ችግሬ ቀላል ነው" ብለው በማሰብ እርዳታ ከመጠየቅ ይቆጠባሉ። ነገር ግን እርዳታ መጠየቅ የጥንካሬ እና ራስን የመንከባከብ ምልክት ነው።

እርዳታ የት ማግኘት ይቻላል?
በዩኒቨርሲቲ ውስጥ፦

የተማሪዎች የምክር አገልግሎት (Counseling Center)፦ ነጻ እና ሚስጥራዊ አገልግሎት ይሰጣሉ።

የጤና ክሊኒክ፦ ለአካላዊ ምርመራ።

አካዳሚክ አማካሪዎችና መምህራን።

በኢትዮጵያ ውስጥ፦

አማኑኤል ሆስፒታል፦ የአእምሮ ጤና ልዩ ሆስፒታል።

ቅዱስ ጳውሎስ ሆስፒታል፦ የስነ-አእምሮ ክፍል (Psychiatry Department)።

የሃይማኖት መሪዎች፦ መንፈሳዊ ድጋፍ ለሚሹ።

እንዴት መጠየቅ ይቻላል? (ጥቂት አባባሎች)
"የሚያናግረኝ ሰው እየፈለግኩ ነበር።"

"ሰሞኑን በጣም ተቸግሬአለሁ፣ የት ነው እርዳታ የማገኘው?"

"ስለ ካውንስሊንግ (የምክር አገልግሎት) መረጃ እፈልጋለሁ።"

ማስታወሻ፦ የአእምሮ ጤናዎ እንደ አካላዊ ጤናዎ ሁሉ ጠቃሚ ነው። ብቻዎን አይሁኑ፤ እርዳታ ይጠይቁ። እርስዎ ብቻዎን አይደሉም፣ ብዙ ተማሪዎች ተመሳሳይ ስሜት ይሰማቸዋል፣ እናም ሁሉም ነገር ያልፋል!   `
    }
  },
  7: {
    title: { en: "Goal Setting & Vision", am: "ግብ ማውጣት እና ራዕይ" },
    icon: <Target className="w-5 h-5" />,
    video: g1,
    pdf: "/public/GOAL SETTING & VISION.pdf",
    detailedContent: {
      en: `Here is a detailed explanation of Goal Setting and Vision in English, based on the text you provided.
Think of this process as building your future with intention. If the Freshman Coordination office is your GPS for the present, then Goal Setting and Vision is your telescope for the future. 
It helps you look ahead, dream big, and then create a practical map to turn those dreams into reality.
It is divided into three core areas: The method you use (SMART Goals), the academic path you take, and the career you are building toward.
🎯 The SMART Goals Framework
This is the "how-to" guide for setting goals. Many people fail to achieve their goals because they are too vague (e.g., "I want to do well in school"). 
The SMART method forces you to turn a wish into a concrete action plan.
- Specific (S):A specific goal is clear and unambiguous.
    - Vague:"I want to get better grades."
    - *Specific:"I want to achieve an A- in my Introduction to Psychology class."
- Measurable (M):You need to be able to track your progress. How will you know you've achieved it?
    - Example: "I will measure my progress by reviewing my quiz scores each week and aiming for at least 85% on each one before the final."
- Achievable (A): The goal should stretch your abilities but still remain possible. It should be realistic given your resources and time. Setting an impossible goal is demotivating.
    - Example: If you work 20 hours a week, aiming for a 4.0 GPA in all honors courses might not be achievable.
     Aiming for a 3.3 GPA might be a realistic stretch.
- Relevant (R):The goal must matter to you and align with your broader life plans. If the goal doesn't fit your values or long-term vision, you won't stay motivated.
    - Example: If you want to be an engineer, setting a goal to excel in your literature class is good, but it's more relevant to set a goal for mastering Calculus.
- Time-bound (T): Every goal needs a deadline. This creates urgency and prevents the goal from being pushed aside forever.
    -Example: "I will achieve a 3.5 GPA **by the end of the Fall 2024 semester."

 📈 Academic Planning
This is where you apply the SMART framework specifically to your life as a student. 
It's about strategically designing your university experience to maximize success and minimize stress.
- GPA targets by semester: Instead of just hoping for good grades, you set specific targets for each semester. 
This allows you to recover if you have a bad semester. For example:
    - Semester 1 Goal: Achieve a 3.0 GPA to get acclimated.
    - Semester 2 Goal: Build on that to achieve a 3.3 GPA.
- Course sequencing: This is the strategic order in which you take your classes.
 It’s like building a pyramid—you need a strong base before you can add the top.
    - Explanation: You can't take "Advanced Astrophysics" without first taking "Intro to Physics 101.
    " Proper sequencing ensures you have the prerequisite knowledge to succeed and that you graduate on time. 
    An advisor helps you map out which classes to take in Year 1, Year 2, etc.
- Extracurricular balance: University is more than just books. Employers and graduate schools look for well-rounded individuals. 
This part of planning helps you manage your time so you can join a club, play a sport, or volunteer, *without* your grades suffering. 
It’s about finding the right mix.
 🌟 Career Vision
This is the "big picture" thinking. It connects what you are doing today (studying) with where you want to be tomorrow (your career).
- Long-term career planning: This is about imagining your ideal professional life 5 or 10 years from now. 
Where do you want to work? 
What kind of problems do you want to solve? 
This vision acts as your "North Star," guiding all the smaller decisions you make.
    - Example: "My long-term vision is to be a software developer who builds educational apps for children in developing countries."
- Skill development roadmap: Once you have a vision, you can work backward to identify the skills you need to get there. 
It’s not just about your major; it’s about specific abilities.
    - Example: To achieve the vision above, your roadmap might include: 
    1) Master Python programming (major courses), 
    2) Learn about child psychology (electives), 
    3) Develop project management skills (through a student club).
- Networking strategies: This is about understanding that who you know is often as important as what you know. 
A "networking strategy" means being intentional about building professional relationships.
    - Explanation: 
    This isn't just about asking for a job. 
    It’s about attending career fairs, connecting with professors during office hours, talking to guest speakers, 
    and using LinkedIn to learn from people in your dream field. 
    These connections can lead to mentorship, internships,and job opportunities down the line.`,
      am: `እንኳን ደህና መጣህ! ከታች ግብ ማውጣት እና ራዕይ (Goal Setting and Vision) ምን ማለት እንደሆነ በአማርኛ በዝርዝር ተብራርቷል።
ግብ ማውጣት እና ራዕይ (Goal Setting and Vision) ማብራሪያ
ይህን ሂደት ለወደፊት ሕይወትህ አላማ በማሰብ ግንባታ መሥራት** አድርገህ ልትቆጥረው ትችላለህ። የፍሬሽማን ኮርዲኔሽን ቢሮ ለአሁኑ ጊዜ 
ጂፒኤስ (GPS)** ከሆነ፣ ግብ ማውጣት እና ራዕይ ለወደፊቱ **ቴሌስኮፕ (ትልቅ አጉሊ መነጽር) ነው። 
ወደፊት ማየት፣ ትልቅ ህልም ማለም እና እነዚያን ህልሞች እውን ለማድረግ ተግባራዊ እቅድ ማውጣት ይረዳሃል።
ይህ ሂደት በሦስት ዋና ዋና ክፍሎች ይከፈላል፡- የምትጠቀምበት ዘዴ (ስማርት ግቦች)፣ የትምህርት መንገድህ እና ወደፊት ልትሠራበት የምትፈልገው ሙያ።
🎯 የስማርት ግቦች ማዕቀፍ (SMART Goals Framework)
ይህ ግቦችን ለማውጣት "እንዴት" የሚለውን መመሪያ ነው።
 ብዙ ሰዎች ግባቸው ላይ መድረስ ያቅታቸዋል፣ ምክንያቱም ግቦቻቸው በጣም ተርፎ የተነገሩ ናቸው (ለምሳሌ "በትምህርቴ ጎበዝ መሆን እፈልጋለሁ")።
  የስማርት ዘዴ ምኞትህን ወደ ተግባራዊ እቅድ እንድትለውጠው ያስገድድሃል።
- ኮንክሪት (Specific - S): ኮንክሪት የሆነ ግብ ግልጽ እና የማያሻማ ነው።
    - ተርፎ የተነገረ: "የተሻለ ውጤት ማምጣት እፈልጋለሁ።"
    - ኮንክሪት: "በስነ-ልቦና መግቢያ (Introduction to Psychology) ክፍል ኤ- (A-) ማምጣት እፈልጋለሁ።"
- ሊለካ የሚችል (Measurable - M):** እድገትህን መከታተል መቻል አለብህ። ግብህ ላይ እንደደረስህ እንዴት ታውቃለህ?
    - ምሳሌ: "በየሳምንቱ የኩዊዝ (ፈተና) ውጤቴን በመመልከት እለካለሁ። ከፈተናው በፊት ቢያንስ 85% ለማምጣት እጥራለሁ።"
- ሊደረስበት የሚችል (Achievable - A): ግቡ አቅምህን ሊፈትን ይገባል፣ ነገር ግን ሊጠናቀቅ የሚችል መሆን አለበት። የማይቻል ግብ ማውጣት ተስፋ ያስቆርጣል።
    - ምሳሌ: በሳምንት 20 ሰአት የምትሠራ ከሆነ፣ በሁሉም ከባድ ኮርሶችህ 4.0 GPA ማምጣት ላይቻል ይችላል። በምትኩ 3.3 GPA ማምጣት ሊደረስበት የሚችል ግብ ሊሆን ይችላል።
- ተዛማጅነት ያለው (Relevant - R): ግቡ ለአንተ አስፈላጊ መሆን እና ከረጅም ጊዜ ህይወትህ እቅድ ጋር መጣጣም አለበት።
    - ምሳሌ: ኢንጂነር መሆን የምትፈልግ ከሆነ፣ በሥነ-ጽሑፍ ክፍል ጥሩ ውጤት ማምጣት ጥሩ ነው። ነገር ግን ካልኩለስን (Calculus) በደንብ ለመረዳት ግብ ማውጣት የበለጠ ተዛማጅነት አለው።
- የጊዜ ገደብ ያለው (Time-bound - T): እያንዳንዱ ግብ የመጨረሻ ቀን ሊኖረው ይገባል።
    - ምሳሌ: "በውድቀት 2024 (Fall 2024) ሴሚስተር መጨረሻ 3.5 GPA አመጣለሁ።"
 📈 የአካዳሚክ እቅድ ማውጣት (Academic Planning)
ይህ የስማርት ማዕቀፍን በተለይ ለተማሪነት ሕይወትህ መተግበር ነው። የዩኒቨርሲቲ ቆይታህን በስልት በመንደፍ ስኬታማ ለመሆን እና ውጥረትን ለመቀነስ ይረዳል።
- በሴሚስተር የGPA ዒላማዎች፡-
    እንዲሁ ጥሩ ውጤት ለማምጣት ከመመኘት ይልቅ፣ ለእያንዳንዱ ሴሚስተር የተወሰነ ዒላማ ታስቀምጣለህ።
     ይህ መጥፎ ሴሚስተር ካጋጠመህ ለማገገም ያስችላል።
    - ምሳሌ:"ሴሚስተር 1 ግብ፡- ከአካባቢው ጋር ለመላመድ 3.0 GPA ማምጣት።"
    - "ሴሚስተር 2 ግብ፡- በዚህ ላይ በመገንባት 3.3 GPA ማምጣት።"
- የኮርስ አተጣጥ (Course Sequencing):ይህ ኮርሶችህን የምትወስድበት ስልታዊ ቅደም ተከተል ነው። እንደ ፒራሚድ ነው - አናት ላይ ለመድረስ ጠንካራ መሰረት ያስፈልጋል።
    - *ማብራሪያ: "ላቀ አስትሮፊዚክስ (Advanced Astrophysics)" ከመውሰድህ በፊት "የፊዚክስ መግቢያ 101 (Intro to Physics 101)" መውሰድ አለብህ።
     ትክክለኛ አተጣጥ ለመሳካት የሚያስፈልገውን ቅድመ-እውቀት እንዳለህ እና በጊዜው እንደምትመረቅ ያረጋግጣል።
- ከትምህርት ውጭ እንቅስቃሴዎች ሚዛን (Extracurricular Balance): ዩኒቨርሲቲ መጽሐፍ ብቻ አይደለም። ቀጣሪዎች እና ምሩቅ ትምህርት ቤቶች ሁለገብ የሆኑ ሰዎችን ይፈልጋሉ። 
ይህ ክፍል ክበብ ለመቀላቀል፣ ስፖርት ለመጫወት ወይም በጎ ፈቃደኛ ለመሆን ጊዜህን እንድታስተዳድር ይረዳል - ያለ ውጤትህ መጎዳት።
 🌟 የሙያ ራዕይ (Career Vision)
ይህ "ትልቁን ምስል" ማሰብ ነው። ዛሬ የምትሠራውን (ማጥናት) ነገ ወደምትፈልገው (ሙያህ) ጋር ያገናኛል።
- የረጅም ጊዜ የሙያ እቅድ (Long-term career planning):ይህ ከአሁን ወደ 5 ወይም 10 ዓመታት በኋላ ያለህን ጥሩ የሙያ ሕይወት መጠናቀቅ ነው። 
የት መሥራት ትፈልጋለህ? ምን አይነት ችግሮች መፍታት ትፈልጋለህ? ይህ ራዕይ እንደ **"ሰሜን ኮከብ (North Star)"ሆኖ ያገለግላል፣ የምታደርጋቸውን ትናንሽ ውሳኔዎች ሁሉ ይመራል።
    - ምሳሌ:"የረጅም ጊዜ ራዕዬ በማጎልበት ላይ ላሉ አገሮች ለሚገኙ ሕጻናት የትምህርት አፕሊኬሽኖችን የሚሠራ ሶፍትዌር ገንቢ (ሶፍትዌር ዴቨሎፐር) መሆን ነው።"
- ክህሎት ማዳበሪያ ካርታ (Skill development roadmap): አንዴ ራዕይ ካለህ፣ ወደ ኋላ ተመልሰህ እዚያ ለመድረስ የሚያስፈልጉህን ክህሎቶች መለየት ትችላለህ። 
ዋና ትምህርትህ (ሜጀርህ) ብቻ አይደለም፤ የተወሰኑ ችሎታዎች ናቸው።
    - ምሳሌ:ከላይ ያለውን ራዕይ ለማሳካት፣ ካርታህ የሚከተሉትን ሊያካትት ይችላል፡- 1) ፓይተን (Python) ፕሮግራሚንግ በደንብ መማር፣ 
    2) ስለ ሕጻናት ስነ-ልቦና መማር፣
     3) የፕሮጀክት አስተዳደር ክህሎት ማዳበር።
- የኔትወርኪንግ (ግንኙነት) ስልቶች (Networking strategies):
ይህ ማንን ማወቅህ እንደ ምን ማወቅህ ብዙ ጊዜ አስፈላጊ ነው የሚለውን መረዳት ነው። "የኔትወርኪንግ ስልት" 
ማለት ሙያዊ ግንኙነቶችን ለመፍጠር አላማ በማሰብ መሥራት ነው።
    - ማብራሪያ: ይህ ሥራ በቀጥታ መጠየቅ ብቻ አይደለም። በሙያ ትርኢቶች (ካሪያ ፌር) 
    ላይ መገኘት፣ ከፕሮፌሰሮች ጋር መነጋገር፣ እንግዳ ተናጋሪዎችን ማዳመጥ እና ሊንክድኢን (LinkedIn) ላይ በመሆን በምትፈልገው መስክ ካሉ ሰዎች መማር ነው። 
    እነዚህ ግንኙነቶች ወደፊት ወደ አማካሪነት (ሜንተርሺፕ)፣ 
    ተለማማጅነት (ኢንተርንሺፕ) እና የሥራ ዕድሎች ሊመሩህ ይችላሉ።`
    }
  },
  8: {
    title: { en: "Academic Support", am: "የአካዳሚክ ድጋፍ" },
    icon: <BookOpen className="w-5 h-5" />,
    pdf: "/public/acadamic support.pdf",
    // ይህ ተጨምሯል
    detailedContent: {
      en: "Fill out the form below to request academic or psychological support from our professional advisors.",
      am: "ከባለሙያ አማካሪዎቻችን የአካዳሚክ ወይም የስነ-ልቦና ድጋፍ ለማግኘት ከታች ያለውን ፎርም ይሙሉ::"
    }
  }
};

const videoSets = {
  1: [a1, a2, a3, a4],
  2: [b1, b2, b3, b4, b5],
  3: [v1, v2, v3],
  4: [d1, d2, d3, d4],
  5: [e1, e2, e3],
  6: [f1, f2, f3, f4, f5],
  7: [g1, g2, g3, g4, g5, g6],
};
export default function Advice() {
const navigate = useNavigate();
  
  // --- 1. ሁሉንም HOOKS እዚህ ጋር ሰብስብ (ከማንኛውም IF በፊት) ---
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState(1);
  const [videoIndex, setVideoIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // Login Check Effect
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Video Index Reset Effect
  useEffect(() => {
    setVideoIndex(0);
  }, [activeTab]);

  // --- 2. አሁን ደህንነቱ በተጠበቀ ሁኔታ USER መኖሩን ቼክ እናድርግ ---
  if (!user) {
    return <div style={{padding: '50px', textAlign: 'center'}}>Loading...</div>;
  }

  // --- 3. የተቀረው የዳታ ሎጂክ (ከ Hook በኋላ መሆን አለበት) ---
  const currentData = ADVICE_DATA[activeTab];
  const currentVideoList = videoSets[activeTab];
  const displayVideo = currentVideoList ? currentVideoList[videoIndex] : currentData?.video;

  const nextVideo = () => {
    if (currentVideoList) setVideoIndex((prev) => (prev < currentVideoList.length - 1 ? prev + 1 : 0));
  };

  const prevVideo = () => {
    if (currentVideoList) setVideoIndex((prev) => (prev > 0 ? prev - 1 : currentVideoList.length - 1));
  };
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages,
    { type: 'user', text: chatInput },
    { type: 'bot', text: lang === 'en' ? 'A counselor will respond shortly.' : 'በቅርቡ አማካሪ ይመልስልዎታል።' }
    ]);
    setChatInput("");
  };
  return (
  
      <div className="advice-root">
  <div className="advice-layout">
    <div className="lang-switcher">
      <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
        <img src={ens} alt="EN" /> English
      </button>
      <button className={lang === "am" ? "active" : ""} onClick={() => setLang("am")}>
        <img src={ams} alt="AM" /> አማርኛ
      </button>
    </div>

 <nav className="advice-nav">
  <div className="nav-group-label">{lang === "en" ? "Categories" : "ዘርፎች"}</div>
  
  {Object.keys(ADVICE_DATA).map((key) => (
    <button
      key={key}
      className={`nav-item ${activeTab === parseInt(key) ? "active" : ""}`}
      onClick={() => setActiveTab(parseInt(key))}
    >
      <span className="nav-icon-box">{ADVICE_DATA[key].icon}</span>
      <span className="nav-title-text">{ADVICE_DATA[key].title[lang]}</span>
    </button>
  ))}

  {/* Divider + My Requests - Student Only */}
  {user?.role === 'student' && (
    <>
      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.1)', 
        margin: '15px 0 5px 0' 
      }}></div>
      
      <button 
        className={`nav-item ${activeTab === 9 ? "active" : ""}`}
        onClick={() => setActiveTab(9)}
        style={{
          border: '1px dashed rgba(255,255,255,0.2)',
          marginTop: '8px'
        }}
      >
        <span className="nav-icon-box">
          <ClipboardList size={18} />
        </span>
        <span className="nav-title-text">
          {lang === "en" ? "My Requests" : "የእኔ ጥያቄዎች"}
        </span>
      </button>
    </>
  )}
</nav>

    <main className="advice-content">
          <div className="content-card fade-in" key={activeTab + lang}>
            {activeTab === 9 ? (
              <div className="request-display-area">
                <h1 className="section-main-title">
                  <ClipboardList className="inline mr-2" /> 
                  {lang === "en" ? "My Advice Requests" : "የላኳቸው ጥያቄዎች"}
                </h1>
                <StudentRequests lang={lang} />
              </div>
            ) : (
              <>
                <div className="video-section">
                  <div className="video-container">
                    <video key={displayVideo} controls className="main-video">
                      <source src={displayVideo} type="video/mp4" />
                    </video>
                    {currentVideoList?.length > 1 && (
                      <div className="video-controls">
                        <button onClick={prevVideo} className="ctrl-btn">{lang === "am" ? "የበፊቱ" : "Previous"}</button>
                        <span className="vid-indicator">{videoIndex + 1} / {currentVideoList.length}</span>
                        <button onClick={nextVideo} className="ctrl-btn">{lang === "am" ? "ቀጣይ" : "Next"}</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-section">
                  <h1 className="text-3xl font-bold mb-4">{currentData?.title[lang]}</h1>
                  <div className="divider"></div>
                  <div className="content-body">
                    {currentData?.detailedContent[lang].split('\n').map((paragraph, idx) => (
                      <p key={idx} className={paragraph.trim().startsWith('•') ? 'bullet-point' : 'para-text'}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="pdf-download-card">
                    <div className="pdf-icon-side"><FileText size={28} /></div>
                    <div className="pdf-info-side">
                      <span className="pdf-label">{lang === 'en' ? 'PDF DOCUMENT' : 'የፒዲኤፍ ሰነድ'}</span>
                      <span className="pdf-name">{currentData?.title[lang]} Guide</span>
                    </div>
                    <a href={currentData?.pdf || '#'} className="pdf-action-btn">
                      <Download size={18} /> {lang === 'en' ? 'Download' : 'አውርድ'}
                    </a>
                  </div>

                  {activeTab === 8 && <Request lang={lang} onSuccess={() => setActiveTab(9)}  />}
                </div>
              </>
            )}
          </div>
        </main>
  </div>
  <AI lang={lang} />
</div>
    );  

}