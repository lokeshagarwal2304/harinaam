<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Naam;

class NaamSeeder extends Seeder
{
    public function run(): void
    {
        $naams = [
            // --- HINDI (हिन्दी) ---
            [
                'name' => 'Ram',
                'display_name' => 'राम',
                'language' => 'hi',
                'slug' => 'ram',
                'description' => 'तारक मंत्र - मर्यादा पुरुषोत्तम श्री राम का पावन नाम',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Sita',
                'display_name' => 'सीता',
                'language' => 'hi',
                'slug' => 'sita',
                'description' => 'जगज्जननी माता सीता का पावन नाम',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Om Namah Shivaya',
                'display_name' => 'ॐ नमः शिवाय',
                'language' => 'hi',
                'slug' => 'om-namah-shivaya',
                'description' => 'पंचाक्षरी महामंत्र - देवाधिदेव महादेव शिव का पावन मंत्र',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Jai Shree Shyam',
                'display_name' => 'जय श्री श्याम',
                'language' => 'hi',
                'slug' => 'jai-shree-shyam',
                'description' => 'हारे का सहारा - खाटू श्याम जी का पावन जयकारा',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Radhe Radhe',
                'display_name' => 'राधे राधे',
                'language' => 'hi',
                'slug' => 'radhe-radhe',
                'description' => 'श्री राधारानी का पावन नाम',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Hare Krishna',
                'display_name' => 'हरे कृष्ण',
                'language' => 'hi',
                'slug' => 'hare-krishna',
                'description' => 'महामंत्र - कलयुग केवल नाम अधारा',
                'is_active' => true,
                'sort_order' => 6,
            ],

            // --- ENGLISH ---
            [
                'name' => 'Ram',
                'display_name' => 'Ram',
                'language' => 'en',
                'slug' => 'en-ram',
                'description' => 'The Divine Name of Lord Rama',
                'is_active' => true,
                'sort_order' => 11,
            ],
            [
                'name' => 'Sita',
                'display_name' => 'Sita',
                'language' => 'en',
                'slug' => 'en-sita',
                'description' => 'The Divine Mother Sita',
                'is_active' => true,
                'sort_order' => 12,
            ],
            [
                'name' => 'Om Namah Shivaya',
                'display_name' => 'Om Namah Shivaya',
                'language' => 'en',
                'slug' => 'en-om-namah-shivaya',
                'description' => 'Five-syllable Mantra of Lord Shiva',
                'is_active' => true,
                'sort_order' => 13,
            ],
            [
                'name' => 'Jai Shree Shyam',
                'display_name' => 'Jai Shree Shyam',
                'language' => 'en',
                'slug' => 'en-jai-shree-shyam',
                'description' => 'Khatu Shyam Ji Holy Name',
                'is_active' => true,
                'sort_order' => 14,
            ],
            [
                'name' => 'Radhe Radhe',
                'display_name' => 'Radhe Radhe',
                'language' => 'en',
                'slug' => 'en-radhe-radhe',
                'description' => 'Divine Radha Rani Name',
                'is_active' => true,
                'sort_order' => 15,
            ],
            [
                'name' => 'Hare Krishna',
                'display_name' => 'Hare Krishna',
                'language' => 'en',
                'slug' => 'en-hare-krishna',
                'description' => 'Maha Mantra of Supreme Peace',
                'is_active' => true,
                'sort_order' => 16,
            ],

            // --- TELUGU (తెలుగు) ---
            [
                'name' => 'Ram',
                'display_name' => 'రామ్',
                'language' => 'te',
                'slug' => 'te-ram',
                'description' => 'శ్రీరామ పవిత్ర నామము',
                'is_active' => true,
                'sort_order' => 21,
            ],
            [
                'name' => 'Sita',
                'display_name' => 'సీత',
                'language' => 'te',
                'slug' => 'te-sita',
                'description' => 'సీతామాత పవిత్ర నామము',
                'is_active' => true,
                'sort_order' => 22,
            ],
            [
                'name' => 'Om Namah Shivaya',
                'display_name' => 'ఓం నమః శివాయ',
                'language' => 'te',
                'slug' => 'te-om-namah-shivaya',
                'description' => 'శివ పంచాక్షరి మహామంత్రం',
                'is_active' => true,
                'sort_order' => 23,
            ],
            [
                'name' => 'Jai Shree Shyam',
                'display_name' => 'జై శ్రీ శ్యామ్',
                'language' => 'te',
                'slug' => 'te-jai-shree-shyam',
                'description' => 'ఖాటూ శ్యామ్ జీ నామము',
                'is_active' => true,
                'sort_order' => 24,
            ],
            [
                'name' => 'Radhe Radhe',
                'display_name' => 'రాధే రాధే',
                'language' => 'te',
                'slug' => 'te-radhe-radhe',
                'description' => 'శ్రీ రాధారాణి పవిత్ర నామము',
                'is_active' => true,
                'sort_order' => 25,
            ],
            [
                'name' => 'Hare Krishna',
                'display_name' => 'హరే కృష్ణ',
                'language' => 'te',
                'slug' => 'te-hare-krishna',
                'description' => 'హరే కృష్ణ మహామంత్రము',
                'is_active' => true,
                'sort_order' => 26,
            ],

            // --- TAMIL (தமிழ்) ---
            [
                'name' => 'Ram',
                'display_name' => 'ராம்',
                'language' => 'ta',
                'slug' => 'ta-ram',
                'description' => 'ஸ்ரீ ராமர் திருநாமம்',
                'is_active' => true,
                'sort_order' => 31,
            ],
            [
                'name' => 'Sita',
                'display_name' => 'சீதா',
                'language' => 'ta',
                'slug' => 'ta-sita',
                'description' => 'சீதா தேவியின் திருநாமம்',
                'is_active' => true,
                'sort_order' => 32,
            ],
            [
                'name' => 'Om Namah Shivaya',
                'display_name' => 'ஓம் நம சிவாய',
                'language' => 'ta',
                'slug' => 'ta-om-namah-shivaya',
                'description' => 'சிவ பஞ்சாட்சர மந்திரம்',
                'is_active' => true,
                'sort_order' => 33,
            ],
            [
                'name' => 'Jai Shree Shyam',
                'display_name' => 'ஜெய் ஸ்ரீ ஷியாம்',
                'language' => 'ta',
                'slug' => 'ta-jai-shree-shyam',
                'description' => 'ஷியாம் பாபா திருநாமம்',
                'is_active' => true,
                'sort_order' => 34,
            ],
            [
                'name' => 'Radhe Radhe',
                'display_name' => 'ராதே ராதே',
                'language' => 'ta',
                'slug' => 'ta-radhe-radhe',
                'description' => 'ராதா ராணி திருநாமம்',
                'is_active' => true,
                'sort_order' => 35,
            ],
            [
                'name' => 'Hare Krishna',
                'display_name' => 'ஹரே கிருஷ்ணா',
                'language' => 'ta',
                'slug' => 'ta-hare-krishna',
                'description' => 'ஹரே கிருஷ்ண மகா மந்திரம்',
                'is_active' => true,
                'sort_order' => 36,
            ],

            // --- KANNADA (ಕನ್ನಡ) ---
            [
                'name' => 'Ram',
                'display_name' => 'ರಾಮ್',
                'language' => 'kn',
                'slug' => 'kn-ram',
                'description' => 'ಶ್ರೀ ರಾಮನ ಪವಿತ್ರ ನಾಮ',
                'is_active' => true,
                'sort_order' => 41,
            ],
            [
                'name' => 'Sita',
                'display_name' => 'ಸೀತಾ',
                'language' => 'kn',
                'slug' => 'kn-sita',
                'description' => 'ಸೀತಾ ಮಾತೆಯ ಪವಿತ್ರ ನಾಮ',
                'is_active' => true,
                'sort_order' => 42,
            ],
            [
                'name' => 'Om Namah Shivaya',
                'display_name' => 'ಓಂ ನಮಃ ಶಿವಾಯ',
                'language' => 'kn',
                'slug' => 'kn-om-namah-shivaya',
                'description' => 'ಶಿವ ಪಂಚಾಕ್ಷರಿ ಮಹಾಮಂತ್ರ',
                'is_active' => true,
                'sort_order' => 43,
            ],
            [
                'name' => 'Jai Shree Shyam',
                'display_name' => 'ಜೈ ಶ್ರೀ ಶ್ಯಾಮ್',
                'language' => 'kn',
                'slug' => 'kn-jai-shree-shyam',
                'description' => 'ಖಾಟೂ ಶ್ಯಾಮ್ ಜೀ ನಾಮ',
                'is_active' => true,
                'sort_order' => 44,
            ],
            [
                'name' => 'Radhe Radhe',
                'display_name' => 'ರಾಧೇ ರಾಧೇ',
                'language' => 'kn',
                'slug' => 'kn-radhe-radhe',
                'description' => 'ಶ್ರೀ ರಾಧಾರಾಣಿಯ ನಾಮ',
                'is_active' => true,
                'sort_order' => 45,
            ],
            [
                'name' => 'Hare Krishna',
                'display_name' => 'ಹರೇ ಕೃಷ್ಣ',
                'language' => 'kn',
                'slug' => 'kn-hare-krishna',
                'description' => 'ಹರೇ ಕೃಷ್ಣ ಮಹಾಮಂತ್ರ',
                'is_active' => true,
                'sort_order' => 46,
            ],
        ];

        foreach ($naams as $naam) {
            Naam::updateOrCreate(
                ['slug' => $naam['slug']],
                $naam
            );
        }
    }
}
