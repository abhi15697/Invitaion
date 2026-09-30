# Template Images Folder Structure

Place all reference photos, card mockups, background textures, and template assets in their respective category folders below:

```
public/images/templates/
├── wedding/
│   ├── royal_peacock.jpg               # Royal Peacock Burgundy & Gold template
│   └── embossed_ivory_peacock.jpg      # Embossed Ivory & Gold Peacock Heart template
├── birthday/
│   └── (place birthday template images here)
├── anniversary/
│   └── (place anniversary template images here)
├── engagement/
│   └── (place engagement template images here)
├── baby-shower/
│   └── (place baby shower template images here)
├── baby-announcement/
│   └── (place baby announcement template images here)
├── graduation/
│   └── (place graduation template images here)
├── housewarming/
│   └── (place housewarming / griha pravesh template images here)
├── party/
│   └── (place party & cocktail template images here)
└── religious/
    └── (place pooja & festival template images here)
```

### How Images Are Used:
1. **Gallery & Modal Previews**:
   - Each template in `src/data/templates.ts` has a `previewImage` property pointing to `/images/templates/<category>/<filename>.jpg`.
2. **Template Renders & Backgrounds**:
   - Template components in `src/templates/<category>/` can load their background textures, photo frames, or visual elements directly from `/images/templates/<category>/`.
3. **Couple / Host Photos**:
   - Stored in `public/images/wedding_couple.jpg` or uploaded dynamically by users during editing.
