import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ClassicSlotMachine from '@/components/ClassicSlotMachine';
import Roulette from '@/components/Roulette';
import Blackjack from '@/components/Blackjack';
import Dice from '@/components/Dice';
import Sidebar from '@/components/Sidebar';
import GameCard from '@/components/GameCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [balance, setBalance] = useState(50000000);
  const [showRules, setShowRules] = useState(false);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const faceUrl = 'https://cdn.poehali.dev/files/531d6c39-e90b-4aa4-b66e-12b444f697fd.jpg';

  const games = [
    { id: 'roulette', title: 'Ебашит Рулетка', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/e2a9681f-18f6-41e1-8a68-cbfbd785ecbb.jpg', isLive: true },
    { id: 'blackjack', title: 'Блядский Джек', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/25deaa11-a1ff-488a-9b68-1db0cb25f66e.jpg', isLive: true },
    { id: 'dice', title: 'Кости Пиздец', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/7ce949fa-006f-438b-b232-b211ef4ac6aa.jpg', isLive: true },
    { id: 'poker1', title: 'Покер Ебаный', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/8cec84ba-62f1-46d0-8b72-dba398199798.jpg', isLive: true },
    { id: 'baccarat', title: 'Баккара Пиздатая', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/cdbc16e1-9a76-48f1-bf45-ca2a33f6a913.jpg', isLive: true },
    { id: 'vip1', title: 'VIP Охуенный', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/58aa6dbb-da4e-4a73-a5bc-c150122d7f9a.jpg', isLive: true },
    { id: 'wheel1', title: 'Колесо Фортуны', provider: 'Evolution Gaming', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/adc0e105-2e4f-4032-b955-06e96cc90d08.jpg', isLive: true },
    { id: 'slot', title: 'Слот Заебись', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/b1ce5d51-e82c-45c0-9074-5b4c0d49527f.jpg', isLive: false },
    { id: 'craps1', title: 'Крэпс Пизда', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/1eb77034-053f-4b70-9c7f-8b42a43a71e1.jpg', isLive: true },
    { id: 'slot1', title: 'Ебать Золото', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/e68b4ba2-b80d-4e75-8eb5-08b457039c5d.jpg', isLive: false },
    { id: 'slot2', title: 'Хуйня Фиеста', provider: 'Play\'n GO', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/45968cc9-544c-47f7-940e-a940ef3704c0.jpg', isLive: false },
    { id: 'slot3', title: 'Пиздатая Принцесса', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/fb615e4e-328d-45b7-80ad-615bf82496fa.jpg', isLive: false },
    { id: 'slot4', title: 'Сладкий Пиздец', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/9a1780f8-7bb6-4b07-8992-0ebc07212e25.jpg', isLive: false },
    { id: 'slot5', title: 'Хуяк Олимпус', provider: 'Pragmatic Play', imageUrl: 'https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/f814daab-841f-425b-8b54-ff8c3d7cad82.jpg', isLive: false },
    { id: 'razor', title: 'Дикий Пиздюк', provider: 'Push Gaming', imageUrl: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=300&fit=crop', isLive: true },
    { id: 'wanted', title: 'Заебатый Мертвец', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=400&h=300&fit=crop', isLive: false },
    { id: 'olympus', title: 'Охуенный Олимп', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop', isLive: false },
    { id: 'gorilla', title: 'Ебашит Горилла', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?w=400&h=300&fit=crop', isLive: false },
    { id: 'fire', title: 'Пиздатый Огонь', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop', isLive: true },
    { id: 'mega', title: 'Мега Ебанько', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=400&h=300&fit=crop', isLive: false },
    { id: 'starburst', title: 'Звёздный Пиздос', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', isLive: false },
    { id: 'g1', title: 'Пиздатые Драконы', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', isLive: false },
    { id: 'g2', title: 'Золото Блядь', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=300&fit=crop', isLive: false },
    { id: 'g3', title: 'Ебаные Фрукты', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400&h=300&fit=crop', isLive: false },
    { id: 'g4', title: 'Дикий Запад', provider: 'Push Gaming', imageUrl: 'https://images.unsplash.com/photo-1509483894388-39a332e19c49?w=400&h=300&fit=crop', isLive: false },
    { id: 'g5', title: 'Египет Охуенный', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=400&h=300&fit=crop', isLive: false },
    { id: 'g6', title: 'Пиздатые Викинги', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=400&h=300&fit=crop', isLive: false },
    { id: 'g7', title: 'Космос Ебаный', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g8', title: 'Пираты Блядь', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', isLive: false },
    { id: 'g9', title: 'Джунгли Пиздец', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop', isLive: false },
    { id: 'g10', title: 'Море Охуенное', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', isLive: false },
    { id: 'g11', title: 'Алмазы Блядь', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop', isLive: false },
    { id: 'g12', title: 'Вулкан Ебаный', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop', isLive: false },
    { id: 'g13', title: 'Фараон Пиздатый', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop', isLive: false },
    { id: 'g14', title: 'Сокровища Ахуенные', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?w=400&h=300&fit=crop', isLive: false },
    { id: 'g15', title: 'Магия Блядская', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g16', title: 'Цирк Ебаный', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1511991093852-2c662c1799fe?w=400&h=300&fit=crop', isLive: false },
    { id: 'g17', title: 'Рыбалка Охуенная', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', isLive: false },
    { id: 'g18', title: 'Лас-Вегас Блядь', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop', isLive: false },
    { id: 'g19', title: 'Казино Пиздатое', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop', isLive: false },
    { id: 'g20', title: 'Книга Ебаная', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop', isLive: false },
    { id: 'g21', title: 'Джокер Охуенный', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=300&fit=crop', isLive: false },
    { id: 'g22', title: 'Сафари Блядское', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop', isLive: false },
    { id: 'g23', title: 'Мексика Пиздатая', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1518045158980-8e1e61e1f5f1?w=400&h=300&fit=crop', isLive: false },
    { id: 'g24', title: 'Ирландия Ебаная', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&h=300&fit=crop', isLive: false },
    { id: 'g25', title: 'Китай Охуенный', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?w=400&h=300&fit=crop', isLive: false },
    { id: 'g26', title: 'Япония Блядская', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop', isLive: false },
    { id: 'g27', title: 'Греция Пиздатая', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300&fit=crop', isLive: false },
    { id: 'g28', title: 'Рим Ебаный', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop', isLive: false },
    { id: 'g29', title: 'Атлантида Охуенная', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g30', title: 'Титаник Блядь', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400&h=300&fit=crop', isLive: false },
    { id: 'g31', title: 'Динозавры Пиздатые', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1619640670337-0b10a7ac3aa2?w=400&h=300&fit=crop', isLive: false },
    { id: 'g32', title: 'Пришельцы Ебаные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=400&h=300&fit=crop', isLive: false },
    { id: 'g33', title: 'Роботы Охуенные', provider: 'Push Gaming', imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=300&fit=crop', isLive: false },
    { id: 'g34', title: 'Зомби Блядские', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=300&fit=crop', isLive: false },
    { id: 'g35', title: 'Вампиры Пиздатые', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1587407627257-27672ab56f40?w=400&h=300&fit=crop', isLive: false },
    { id: 'g36', title: 'Оборотни Ебаные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1541480551145-2370a440d585?w=400&h=300&fit=crop', isLive: false },
    { id: 'g37', title: 'Ведьмы Охуенные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=300&fit=crop', isLive: false },
    { id: 'g38', title: 'Феи Блядские', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g39', title: 'Единороги Пиздатые', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1541480551145-2370a440d585?w=400&h=300&fit=crop', isLive: false },
    { id: 'g40', title: 'Пегасы Ебаные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop', isLive: false },
    { id: 'g41', title: 'Фениксы Охуенные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop', isLive: false },
    { id: 'g42', title: 'Грифоны Блядские', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', isLive: false },
    { id: 'g43', title: 'Кракены Пиздатые', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g44', title: 'Медузы Ебаные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g45', title: 'Минотавры Охуенные', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300&fit=crop', isLive: false },
    { id: 'g46', title: 'Циклопы Блядские', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300&fit=crop', isLive: false },
    { id: 'g47', title: 'Гидры Пиздатые', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', isLive: false },
    { id: 'g48', title: 'Химеры Ебаные', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1541480551145-2370a440d585?w=400&h=300&fit=crop', isLive: false },
    { id: 'g49', title: 'Горгульи Охуенные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=300&fit=crop', isLive: false },
    { id: 'g50', title: 'Тролли Блядские', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop', isLive: false },
    { id: 'g51', title: 'Гоблины Пиздатые', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop', isLive: false },
    { id: 'g52', title: 'Орки Ебаные', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop', isLive: false },
    { id: 'g53', title: 'Эльфы Охуенные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop', isLive: false },
    { id: 'g54', title: 'Гномы Блядские', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop', isLive: false },
    { id: 'g55', title: 'Гиганты Пиздатые', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1541480551145-2370a440d585?w=400&h=300&fit=crop', isLive: false },
    { id: 'g56', title: 'Титаны Ебаные', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300&fit=crop', isLive: false },
    { id: 'g57', title: 'Боги Охуенные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300&fit=crop', isLive: false },
    { id: 'g58', title: 'Ангелы Блядские', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g59', title: 'Демоны Пиздатые', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1587407627257-27672ab56f40?w=400&h=300&fit=crop', isLive: false },
    { id: 'g60', title: 'Драконы Ебаные 2', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', isLive: false },
    { id: 'g61', title: 'Волшебники Охуенные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g62', title: 'Самураи Блядские', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop', isLive: false },
    { id: 'g63', title: 'Ниндзя Пиздатые', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop', isLive: false },
    { id: 'g64', title: 'Рыцари Ебаные', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop', isLive: false },
    { id: 'g65', title: 'Короли Охуенные', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop', isLive: false },
    { id: 'g66', title: 'Королевы Блядские', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300&fit=crop', isLive: false },
    { id: 'g67', title: 'Принцы Пиздатые', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop', isLive: false },
    { id: 'g68', title: 'Принцессы Ебаные', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300&fit=crop', isLive: false },
    { id: 'g69', title: 'Пиздатый Бонус 69', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop', isLive: true },
    { id: 'g70', title: 'Львы Охуенные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=300&fit=crop', isLive: false },
    { id: 'g71', title: 'Тигры Блядские', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=300&fit=crop', isLive: false },
    { id: 'g72', title: 'Медведи Пиздатые', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1525382455947-f319bc05fb35?w=400&h=300&fit=crop', isLive: false },
    { id: 'g73', title: 'Волки Ебаные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1543924207-98c39fcab7d7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g74', title: 'Орлы Охуенные', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1598965675045-742e5c8c74fd?w=400&h=300&fit=crop', isLive: false },
    { id: 'g75', title: 'Соколы Блядские', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1598965675045-742e5c8c74fd?w=400&h=300&fit=crop', isLive: false },
    { id: 'g76', title: 'Пантеры Пиздатые', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=300&fit=crop', isLive: false },
    { id: 'g77', title: 'Леопарды Ебаные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400&h=300&fit=crop', isLive: false },
    { id: 'g78', title: 'Ягуары Охуенные', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=300&fit=crop', isLive: false },
    { id: 'g79', title: 'Пумы Блядские', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=300&fit=crop', isLive: false },
    { id: 'g80', title: 'Акулы Пиздатые', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=400&h=300&fit=crop', isLive: false },
    { id: 'g81', title: 'Киты Ебаные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', isLive: false },
    { id: 'g82', title: 'Дельфины Охуенные', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', isLive: false },
    { id: 'g83', title: 'Черепахи Блядские', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g84', title: 'Змеи Пиздатые', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1531833483384-f8c5c090aec2?w=400&h=300&fit=crop', isLive: false },
    { id: 'g85', title: 'Скорпионы Ебаные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=300&fit=crop', isLive: false },
    { id: 'g86', title: 'Пауки Охуенные', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=300&fit=crop', isLive: false },
    { id: 'g87', title: 'Крокодилы Блядские', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop', isLive: false },
    { id: 'g88', title: 'Аллигаторы Пиздатые', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop', isLive: false },
    { id: 'g89', title: 'Комодо Ебаные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1531833483384-f8c5c090aec2?w=400&h=300&fit=crop', isLive: false },
    { id: 'g90', title: 'Саламандры Охуенные', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=300&fit=crop', isLive: false },
    { id: 'g91', title: 'Лягушки Блядские', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1534567110243-6a484e1e9314?w=400&h=300&fit=crop', isLive: false },
    { id: 'g92', title: 'Жабы Пиздатые', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1534567110243-6a484e1e9314?w=400&h=300&fit=crop', isLive: false },
    { id: 'g93', title: 'Бабочки Ебаные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=300&fit=crop', isLive: false },
    { id: 'g94', title: 'Стрекозы Охуенные', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=300&fit=crop', isLive: false },
    { id: 'g95', title: 'Божьи Коровки Блядь', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=300&fit=crop', isLive: false },
    { id: 'g96', title: 'Пчелы Пиздатые', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1558827127-44a57c8e8c29?w=400&h=300&fit=crop', isLive: false },
    { id: 'g97', title: 'Осы Ебаные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1558827127-44a57c8e8c29?w=400&h=300&fit=crop', isLive: false },
    { id: 'g98', title: 'Шмели Охуенные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1558827127-44a57c8e8c29?w=400&h=300&fit=crop', isLive: false },
    { id: 'g99', title: 'Светлячки Блядские', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g100', title: 'Кометы Пиздатые', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g101', title: 'Метеоры Ебаные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g102', title: 'Звезды Охуенные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g103', title: 'Планеты Блядские', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g104', title: 'Галактики Пиздатые', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g105', title: 'Вселенные Ебаные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g106', title: 'Черные Дыры Охуенные', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g107', title: 'Млечный Путь Блядь', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g108', title: 'Сатурн Пиздатый', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g109', title: 'Юпитер Ебаный', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g110', title: 'Марс Охуенный', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g111', title: 'Венера Блядская', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g112', title: 'Меркурий Пиздатый', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', isLive: false },
    { id: 'g113', title: 'Луна Ебаная', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1509567143958-b9e102b69b42?w=400&h=300&fit=crop', isLive: false },
    { id: 'g114', title: 'Солнце Охуенное', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop', isLive: false },
    { id: 'g115', title: 'Затмение Блядское', provider: 'Microgaming', imageUrl: 'https://images.unsplash.com/photo-1509567143958-b9e102b69b42?w=400&h=300&fit=crop', isLive: false },
    { id: 'g116', title: 'Северное Сияние Пиздатое', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=400&h=300&fit=crop', isLive: false },
    { id: 'g117', title: 'Молнии Ебаные', provider: 'Play\'n GO', imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop', isLive: false },
    { id: 'g118', title: 'Грозы Охуенные', provider: 'NetEnt', imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop', isLive: false },
    { id: 'g119', title: 'Ураганы Блядские', provider: 'Pragmatic Play', imageUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400&h=300&fit=crop', isLive: false },
    { id: 'g120', title: 'Торнадо Пиздатые', provider: 'Hacksaw Gaming', imageUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400&h=300&fit=crop', isLive: false },
  ];

  return (
    <div className="min-h-screen bg-[#1a1f2e] relative overflow-hidden">
      
      <div className={`hidden lg:block fixed left-0 top-0 z-40`}>
        <Sidebar balance={balance} onBalanceChange={setBalance} />
      </div>
      
      {showSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
          <div className="fixed left-0 top-0 z-50 lg:hidden animate-fade-in">
            <Sidebar balance={balance} onBalanceChange={setBalance} />
          </div>
        </>
      )}
      
      <div className="lg:ml-64">
        <div className="bg-[#0f1419] border-b border-gray-800 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden bg-gray-800 hover:bg-gray-700 p-2 h-9 w-9"
              >
                <Icon name="Menu" size={18} />
              </Button>
              <div className="text-orange-500 font-black text-lg md:text-2xl tracking-tight">
                🎰 СВЯТОЗАР
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-green-600 rounded-md">
                <span className="text-white text-sm font-bold">{(balance / 1000000).toFixed(0)}M₽</span>
              </div>
              <Button
                onClick={() => setCurrentGame(null)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 h-auto text-sm"
              >
                <Icon name="Home" size={16} />
              </Button>
            </div>
          </div>
        </div>

        <main className="relative max-w-7xl mx-auto px-3 py-4">
          {currentGame === 'slot' ? (
            <div className="max-w-4xl mx-auto">
              <ClassicSlotMachine balance={balance} onBalanceChange={setBalance} />
            </div>
          ) : (currentGame === 'roulette' || currentGame === 'roulette2') ? (
            <div className="max-w-6xl mx-auto">
              <Roulette balance={balance} onBalanceChange={setBalance} />
            </div>
          ) : currentGame === 'blackjack' ? (
            <div className="max-w-5xl mx-auto">
              <Blackjack balance={balance} onBalanceChange={setBalance} />
            </div>
          ) : currentGame === 'dice' ? (
            <div className="max-w-5xl mx-auto">
              <Dice balance={balance} onBalanceChange={setBalance} />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 via-green-500 to-green-600 h-40 md:h-52">
                <img 
                  src="https://cdn.poehali.dev/projects/649f2b7d-9a90-4f73-be76-293c3e9ba945/files/6f73716c-38f0-482c-9097-a14c1fbb88d9.jpg" 
                  alt="Bonus"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
                  <div className="max-w-md">
                    <h2 className="text-xl md:text-3xl font-black text-white mb-2 leading-tight">
                      БОНУС НА ПЕРВЫЙ ДЕПОЗИТ
                    </h2>
                    <p className="text-2xl md:text-4xl font-black text-yellow-400 mb-3">
                      150 000 000₽ + 150 FS
                    </p>
                    <Button className="bg-green-500 hover:bg-green-400 text-white font-black text-sm md:text-base px-6 py-2 rounded-lg">
                      ПОПОЛНИТЬ СЧЁТ
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white text-lg md:text-xl font-bold flex items-center gap-2">
                    <span className="text-orange-500">🔥</span> Популярные игры
                  </h3>
                  <input 
                    type="text" 
                    placeholder="Поиск..."
                    className="bg-[#0f1419] text-white px-3 py-2 rounded-lg border border-gray-700 text-sm w-32 md:w-48 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                  {games.map((game) => (
                    <GameCard
                      key={game.id}
                      title={game.title}
                      provider={game.provider}
                      imageUrl={game.imageUrl}
                      isLive={game.isLive}
                      onClick={() => setCurrentGame(game.id)}
                    />
                  ))}
                </div>
              </div>
              <Dialog open={false}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold flex items-center gap-2">
                    <Icon name="BookOpen" size={28} />
                    Правила игры
                  </DialogTitle>
                  <DialogDescription className="text-base mt-4">
                    Узнайте, как играть в Святозар и выигрывать!
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 mt-6">
                  <Card className="p-6 bg-primary/5 border-primary/20">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Icon name="Target" size={22} className="text-primary" />
                      Цель игры
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Собрать одинаковые комбинации чисел на трёх барабанах игрового автомата. 
                      Чем реже комбинация, тем выше выигрыш!
                    </p>
                  </Card>

                  <Card className="p-6 bg-secondary/5 border-secondary/20">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Icon name="Gamepad2" size={22} className="text-secondary" />
                      Как играть
                    </h3>
                    <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                      <li className="leading-relaxed">
                        <strong>Выберите ставку</strong> — от 10₽ до 1000₽ с шагом 10₽
                      </li>
                      <li className="leading-relaxed">
                        <strong>Нажмите кнопку "Крутить"</strong> — барабаны начнут вращаться
                      </li>
                      <li className="leading-relaxed">
                        <strong>Дождитесь результата</strong> — барабаны остановятся через 2 секунды
                      </li>
                      <li className="leading-relaxed">
                        <strong>Получите выигрыш</strong> — если выпала выигрышная комбинация
                      </li>
                    </ol>
                  </Card>

                  <Card className="p-6 bg-accent/5 border-accent/20">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Icon name="Trophy" size={22} className="text-accent" />
                      Таблица выплат
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-secondary">7️⃣ 7️⃣ 7️⃣</span>
                          <span className="font-semibold">ДЖЕКПОТ!</span>
                        </div>
                        <span className="text-xl font-bold text-secondary">×100 ставки</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">🔢 🔢 🔢</span>
                          <span className="font-medium">Три одинаковых</span>
                        </div>
                        <span className="text-lg font-bold text-primary">×10 ставки</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">🔢 🔢 ❓</span>
                          <span className="font-medium">Два одинаковых</span>
                        </div>
                        <span className="text-lg font-bold">×2 ставки</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-destructive/5 border-destructive/20">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Icon name="AlertCircle" size={22} className="text-destructive" />
                      Важно знать
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="ChevronRight" size={18} className="mt-1 flex-shrink-0" />
                        <span>Минимальная ставка — 10₽, максимальная — 1000₽</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="ChevronRight" size={18} className="mt-1 flex-shrink-0" />
                        <span>Невозможно сделать ставку, если на балансе недостаточно средств</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="ChevronRight" size={18} className="mt-1 flex-shrink-0" />
                        <span>Все выигрыши зачисляются на баланс автоматически</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="ChevronRight" size={18} className="mt-1 flex-shrink-0" />
                        <span>Комбинация 7-7-7 — самая редкая и приносит максимальный выигрыш</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground">
                    🎲 Играйте ответственно! Это развлекательная игра.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

              <div className="mt-12 text-center">
                <p className="text-white/70 text-sm md:text-base mb-4">Нас рекомендуют:</p>
                <div className="flex flex-wrap justify-center gap-6 items-center opacity-50">
                  <div className="text-white font-bold text-lg">CASINO GURU AWARDS</div>
                  <div className="text-white font-bold text-lg">⚡ LCB</div>
                  <div className="text-white font-bold text-lg">💎 LatestCasino Bonuses</div>
                  <div className="text-white font-bold text-lg">🎯 GECOGRA</div>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="relative border-t-2 border-orange-500/50 mt-20 py-8 bg-slate-900/80">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/80 font-bold">
              © 2024 СВЯТОЗАР СЛОТ ЕБЁТ ВСЕХ В РОТ
            </p>
            <p className="text-sm text-white/50 mt-2">
              Играйте ответственно. 18+
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;