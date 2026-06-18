#!/usr/bin/env python3
"""Generate the printable Growth Bottleneck Checklist one-pager.

Copy is kept in sync with src/pages/growth-bottleneck-checklist.astro
(the `bottlenecks` array and the "How to read your result" list).
Run:  python3 ops/generate-checklist-pdf.py
Output: public/growth-bottleneck-checklist.pdf
"""
from fpdf import FPDF

ACCENT = (85, 35, 240)      # --accent #5523f0
INK = (16, 16, 18)          # near-black
MUTED = (90, 92, 105)       # muted slate
LINE = (224, 224, 230)      # hairline
SURFACE = (247, 246, 251)   # light surface

BOTTLENECKS = [
    ("ICP",
     "Different customers buy for different reasons, and the team keeps changing who the offer is for.",
     "Can you name the fastest-converting customer segment and the trigger that makes them act?"),
    ("Channels",
     "Activity is spread across paid, content, outbound, SEO, partnerships, and founder posting without a clear winner.",
     "Can you say which channel creates the most qualified learning, not just the most motion?"),
    ("Conversion",
     "Traffic, demos, or trials exist, but the next step is weak because the offer, proof, or trust sequence is unclear.",
     "Can a first-time buyer understand what changes after buying within five seconds?"),
    ("Founder-led sales dependency",
     "Deals move when the founder is involved, then slow down when the team runs the same motion.",
     "Can the team repeat the founder's narrative without losing urgency, context, or credibility?"),
    ("Revenue operations",
     "The dashboard reports activity, but it does not explain what to scale, stop, or fix next.",
     "Can the leadership team make one clear growth decision from the current reporting cadence?"),
]

HOW_TO_READ = [
    ("One area weak:",
     "fix that first — it's usually a focused 2–4 week job, not a re-org."),
    ("Two areas weak:",
     "sequence them — pick the one closest to revenue and bring the other to a Growth Audit."),
    ("Three or more weak:",
     "the constraint is the system, not a channel. That's exactly what the free 20-minute audit is for."),
]

MARGIN = 14.0
PAGE_W = 210.0
CONTENT_W = PAGE_W - 2 * MARGIN


FONT_DIR = "/usr/share/fonts/truetype/liberation"


def register_fonts(pdf):
    """Liberation Sans is metric-compatible with Helvetica and covers the
    typographic punctuation (em/en dashes, curly quotes) in the copy."""
    pdf.add_font("Brand", "", f"{FONT_DIR}/LiberationSans-Regular.ttf")
    pdf.add_font("Brand", "B", f"{FONT_DIR}/LiberationSans-Bold.ttf")
    pdf.add_font("Brand", "I", f"{FONT_DIR}/LiberationSans-Italic.ttf")
    pdf.add_font("Brand", "BI", f"{FONT_DIR}/LiberationSans-BoldItalic.ttf")


def main():
    pdf = FPDF(orientation="P", unit="mm", format="A4")
    register_fonts(pdf)
    pdf.set_auto_page_break(auto=False)
    pdf.set_margins(MARGIN, MARGIN, MARGIN)
    pdf.add_page()

    # ---- Header band ----
    pdf.set_fill_color(*ACCENT)
    pdf.rect(0, 0, PAGE_W, 4, style="F")

    pdf.set_xy(MARGIN, 12)
    pdf.set_text_color(*ACCENT)
    pdf.set_font("Brand", "B", 8)
    pdf.cell(0, 4, "GROWTH BOTTLENECK CHECKLIST", new_x="LMARGIN", new_y="NEXT")

    pdf.set_xy(MARGIN, 17)
    pdf.set_text_color(*INK)
    pdf.set_font("Brand", "B", 19)
    pdf.cell(0, 9, "Find the bottleneck before you add another channel.",
             new_x="LMARGIN", new_y="NEXT")

    pdf.set_xy(MARGIN, 27)
    pdf.set_text_color(*MUTED)
    pdf.set_font("Brand", "", 9.5)
    pdf.multi_cell(CONTENT_W, 4.6,
                   "For post-PMF founders. Score each constraint honestly. If you can't answer the "
                   "check question with a clear yes, mark it weak.")

    y = 40.0
    box_h = 27.0
    gap = 3.2
    for i, (title, symptom, check) in enumerate(BOTTLENECKS, start=1):
        draw_card(pdf, y, box_h, i, title, symptom, check)
        y += box_h + gap

    # ---- How to read your result ----
    y += 1.5
    pdf.set_xy(MARGIN, y)
    pdf.set_text_color(*ACCENT)
    pdf.set_font("Brand", "B", 8)
    pdf.cell(0, 4, "HOW TO READ YOUR RESULT", new_x="LMARGIN", new_y="NEXT")
    y += 6.0
    pdf.set_font("Brand", "", 9)
    for lead, rest in HOW_TO_READ:
        pdf.set_xy(MARGIN, y)
        pdf.set_text_color(*ACCENT)
        pdf.set_font("Brand", "B", 9)
        lead_w = pdf.get_string_width(lead + " ")
        pdf.cell(lead_w, 4.6, lead)
        pdf.set_text_color(*MUTED)
        pdf.set_font("Brand", "", 9)
        pdf.multi_cell(CONTENT_W - lead_w, 4.6, rest, new_x="LMARGIN", new_y="NEXT")
        y = pdf.get_y() + 1.4

    # ---- Footer ----
    pdf.set_draw_color(*LINE)
    pdf.set_line_width(0.2)
    pdf.line(MARGIN, 284, PAGE_W - MARGIN, 284)
    pdf.set_xy(MARGIN, 286)
    pdf.set_text_color(*MUTED)
    pdf.set_font("Brand", "", 8)
    pdf.cell(CONTENT_W / 2, 4, "Daniel Johnson · Fractional CMO")
    pdf.set_font("Brand", "B", 8)
    pdf.set_text_color(*ACCENT)
    pdf.cell(CONTENT_W / 2, 4, "danieljohnson.xyz/growth-audit",
             align="R")

    pdf.output("public/growth-bottleneck-checklist.pdf")
    print("wrote public/growth-bottleneck-checklist.pdf")


def draw_card(pdf, y, h, num, title, symptom, check):
    # card background + left accent rule
    pdf.set_fill_color(*SURFACE)
    pdf.set_draw_color(*LINE)
    pdf.set_line_width(0.2)
    pdf.rect(MARGIN, y, CONTENT_W, h, style="DF")
    pdf.set_fill_color(*ACCENT)
    pdf.rect(MARGIN, y, 1.3, h, style="F")

    pad = 4.0
    inner_x = MARGIN + pad
    inner_w = CONTENT_W - 2 * pad - 8  # leave room for checkbox

    # checkbox top-right
    box = 5.0
    bx = MARGIN + CONTENT_W - pad - box
    pdf.set_draw_color(*ACCENT)
    pdf.set_line_width(0.4)
    pdf.rect(bx, y + pad, box, box, style="D")

    # number + title
    pdf.set_xy(inner_x, y + pad - 0.5)
    pdf.set_text_color(*ACCENT)
    pdf.set_font("Brand", "B", 8)
    pdf.cell(7, 5, f"0{num}")
    pdf.set_text_color(*INK)
    pdf.set_font("Brand", "B", 11)
    pdf.cell(inner_w - 7, 5, title)

    # likely symptom
    pdf.set_xy(inner_x, y + pad + 6.0)
    pdf.set_text_color(*MUTED)
    pdf.set_font("Brand", "I", 8.3)
    pdf.multi_cell(inner_w, 3.9, "Likely symptom:  " + symptom)

    # check question
    cy = pdf.get_y() + 0.6
    pdf.set_xy(inner_x, cy)
    pdf.set_text_color(*INK)
    pdf.set_font("Brand", "B", 8.6)
    pdf.multi_cell(inner_w, 3.9, "Check:  " + check)


if __name__ == "__main__":
    main()
