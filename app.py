from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    projects = [
        {
            "title": "FLAME BURGER",
            "description": "Toshkentdagi burger restorani uchun landing page. Menyu, kombolar, filiallar va mijoz sharhlari.",
            "url": "http://burger00.pythonanywhere.com/",
            "tech": ["Flask", "HTML", "CSS", "JavaScript"],
            "icon": "🍔",
            "tag": "Restoran",
        },
        {
            "title": "CyberDojo",
            "description": "Kiberxavfsizlik akademiyasi platformasi. Kurslar, CTF mashg'ulotlari va interaktiv darslar.",
            "url": "https://hackers00.pythonanywhere.com/",
            "tech": ["Flask", "Python", "HTML", "CSS"],
            "icon": "🛡️",
            "tag": "Ta'lim",
        },
        {
            "title": "RGB Generator",
            "description": "Ranglar bilan ishlash uchun interaktiv RGB generator va rang tanlash vositasi.",
            "url": "https://rgb-k9hg.onrender.com/",
            "tech": ["Flask", "HTML", "CSS", "JavaScript"],
            "icon": "🎨",
            "tag": "Vosita",
        },
        {
            "title": "Sefr",
            "description": "Kitoblar va o'quv materiallari uchun zamonaviy web platforma.",
            "url": "https://sefr-s1n0.onrender.com/",
            "tech": ["Flask", "Python", "HTML", "CSS"],
            "icon": "📚",
            "tag": "Platforma",
        },
        {
            "title": "Online Shop",
            "description": "To'liq funksional onlayn do'kon. Mahsulotlar katalogi va buyurtma berish tizimi.",
            "url": "https://online-shop-lux9.onrender.com/",
            "tech": ["Flask", "Python", "HTML", "CSS"],
            "icon": "🛒",
            "tag": "E-commerce",
        },
        {
            "title": "TreydSim",
            "description": "Virtual balans bilan treyding o'rganish platformasi. AI yordamchi va real vaqtli grafiklar.",
            "url": "https://ascend-trade-bot.lovable.app",
            "tech": ["React", "TypeScript", "Tailwind CSS", "AI"],
            "icon": "📈",
            "tag": "Fintech",
        },
        {
            "title": "NexLMS AI",
            "description": "AI bilan kuchaytirilgan enterprise LMS. Kurslar, AI quiz generator va progress tracking.",
            "url": "https://next-gen-enterprise-lms-a-384.created.app/",
            "tech": ["Next.js", "AI", "JavaScript", "CSS"],
            "icon": "🎓",
            "tag": "Ta'lim",
        },
        {
            "title": "Salomatlik Tahlili",
            "description": "Salomatlik ko'rsatkichlarini kuzatish va maqsadlarga erishish uchun bio-metrika ilovasi.",
            "url": "https://advanced-bio-metrics-nutr-28.created.app/",
            "tech": ["JavaScript", "HTML", "CSS", "Python"],
            "icon": "💊",
            "tag": "Sog'liq",
        },
        {
            "title": "Virtual Workspace",
            "description": "AI-powered WebRTC asosidagi peer-to-peer intervyu xonasi va hamkorlik muhiti.",
            "url": "https://virtual-workspace-ai-inte-745.created.app/",
            "tech": ["WebRTC", "AI", "JavaScript", "CSS"],
            "icon": "🖥️",
            "tag": "Collaboration",
        },
        {
            "title": "Kanban Board",
            "description": "Real-time Kanban doskasi. Vazifalarni boshqarish va jamoa bilan sinxron ishlash.",
            "url": "https://real-time-kanban-board-with-677.created.app/",
            "tech": ["JavaScript", "WebSocket", "HTML", "CSS"],
            "icon": "📋",
            "tag": "Productivity",
        },
    ]

    skills = [
        {"name": "Python", "level": 90},
        {"name": "Flask", "level": 85},
        {"name": "Django", "level": 80},
        {"name": "HTML / CSS", "level": 90},
        {"name": "JavaScript", "level": 75},
        {"name": "Backend", "level": 85},
        {"name": "Frontend", "level": 85},
    ]

    return render_template("index.html", projects=projects, skills=skills)


if __name__ == "__main__":
    app.run(debug=True)
