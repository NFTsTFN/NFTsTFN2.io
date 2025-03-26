document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts once DOM is loaded
    initCharts();
});

function initCharts() {
    // Set default Chart.js options for consistent styling
    Chart.defaults.font.family = "'Roboto', sans-serif";
    Chart.defaults.color = '#6c757d';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    Chart.defaults.plugins.legend.position = 'bottom';
    
    // Initialize specific charts
    initRevenueGrowthChart();
    initInvestmentChart();
    initROIComparisonChart();
    initCashFlowChart();
    initCompetitorAnalysisChart();
    initMarketTrendsChart();
}

function initRevenueGrowthChart() {
    const ctx = document.getElementById('revenueGrowthChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Первый год', 'Второй год', 'Третий год'],
            datasets: [
                {
                    label: 'Минимальный прогноз',
                    data: [4000000, 7500000, 10000000],
                    backgroundColor: 'rgba(13, 110, 253, 0.6)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Максимальный прогноз',
                    data: [5000000, 10000000, 12500000],
                    backgroundColor: 'rgba(25, 135, 84, 0.6)',
                    borderColor: 'rgba(25, 135, 84, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Выручка (руб.)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ₽';
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Прогноз роста выручки',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw.toLocaleString() + ' ₽';
                        }
                    }
                }
            }
        }
    });
}

function initInvestmentChart() {
    const ctx = document.getElementById('investmentChart');
    if (!ctx) return;
    
    // Исходные данные о затратах
    const investmentData = {
        'Разработка веб-сайта': 400000,
        'Разработка мобильного приложения': 300000,
        'Интеграция с системами': 100000,
        'Серверная инфраструктура': 100000,
        'Обучение персонала': 50000,
        'Маркетинговое продвижение': 50000
    };
    
    // Цвета для секторов диаграммы
    const backgroundColors = [
        'rgba(13, 110, 253, 0.7)',
        'rgba(25, 135, 84, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(220, 53, 69, 0.7)',
        'rgba(13, 202, 240, 0.7)',
        'rgba(108, 117, 125, 0.7)'
    ];
    
    // Получаем массивы меток и данных из объекта
    const labels = Object.keys(investmentData);
    const data = Object.values(investmentData);
    
    // Создаем переменную для активных/неактивных категорий
    const activeCategories = labels.map(() => true);
    
    // Создаем диаграмму
    const investmentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Структура первоначальных инвестиций (CAPEX)',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw.toLocaleString() + ' ₽';
                            const percentage = (context.raw / getTotalInvestment() * 100).toFixed(1) + '%';
                            return context.label + ': ' + value + ' (' + percentage + ')';
                        },
                        afterFooter: function() {
                            return '';
                        }
                    }
                },
                subtitle: {
                    display: true,
                    text: 'Итого: ' + getTotalInvestment().toLocaleString() + ' ₽',
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                }
            },
            onClick: null
        }
    });
    
    // Функция для обновления итогового значения CAPEX в таблице
    function updateTotalCapexInTable() {
        const totalCapexElement = document.querySelector('.table-primary strong:last-child');
        if (totalCapexElement) {
            totalCapexElement.innerText = getTotalInvestment().toLocaleString();
        }
    }
    
    // Функция для получения текущей суммы инвестиций
    function getTotalInvestment() {
        let total = 0;
        activeCategories.forEach((isActive, index) => {
            if (isActive) {
                total += Object.values(investmentData)[index];
            }
        });
        return total;
    }
    
    // Убираем обработчик клика на диаграмме для устранения бага
    function handleChartClick(event) {
        // Функция отключена для предотвращения багов
        return;
    }
}

function initROIComparisonChart() {
    const ctx = document.getElementById('roiComparisonChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Цифровое решение', 'Открытие нового магазина', 'Расширение ассортимента', 'Банковский депозит'],
            datasets: [{
                label: 'ROI за 3 года (%)',
                data: [205, 120, 90, 20],
                backgroundColor: [
                    'rgba(13, 110, 253, 0.7)',
                    'rgba(25, 135, 84, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(108, 117, 125, 0.7)'
                ],
                borderColor: [
                    'rgba(13, 110, 253, 1)',
                    'rgba(25, 135, 84, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(108, 117, 125, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ROI (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Сравнение ROI альтернативных инвестиций',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'ROI: ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

function initCashFlowChart() {
    const ctx = document.getElementById('cashFlowChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Начало', 'Год 1', 'Год 2', 'Год 3'],
            datasets: [
                {
                    label: 'Чистый денежный поток',
                    data: [-1000000, 1100000, 2200000, 2500000],
                    borderColor: 'rgba(13, 110, 253, 1)',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Накопленный денежный поток',
                    data: [-1000000, 100000, 2300000, 4800000],
                    borderColor: 'rgba(25, 135, 84, 1)',
                    backgroundColor: 'rgba(25, 135, 84, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Денежный поток (руб.)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ₽';
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Денежный поток по годам',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw.toLocaleString() + ' ₽';
                        }
                    }
                }
            }
        }
    });
}

function initCompetitorAnalysisChart() {
    const ctx = document.getElementById('competitorAnalysisChart');
    if (!ctx) return;
    
    const radarData = {
        labels: [
            'Веб-сайт',
            'Мобильное приложение',
            'Онлайн-заказ',
            'Проверка наличия',
            'Программа лояльности',
            'Персонализация',
            'Контент'
        ],
        datasets: [
            {
                label: 'ХОЗМИР (текущее)',
                data: [1, 0, 0, 0, 2, 0, 1],
                backgroundColor: 'rgba(220, 53, 69, 0.2)',
                borderColor: 'rgba(220, 53, 69, 1)',
                pointBackgroundColor: 'rgba(220, 53, 69, 1)',
                borderWidth: 2
            },
            {
                label: 'ХОЗМИР (с решением)',
                data: [4, 4, 4, 4, 4, 3, 4],
                backgroundColor: 'rgba(13, 110, 253, 0.2)',
                borderColor: 'rgba(13, 110, 253, 1)',
                pointBackgroundColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 2
            },
            {
                label: 'Леруа Мерлен',
                data: [5, 4, 5, 5, 4, 3, 5],
                backgroundColor: 'rgba(25, 135, 84, 0.2)',
                borderColor: 'rgba(25, 135, 84, 1)',
                pointBackgroundColor: 'rgba(25, 135, 84, 1)',
                borderWidth: 2
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'radar',
        data: radarData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Сравнительный анализ цифровых решений',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            let rating = '';
                            switch(value) {
                                case 0: rating = 'Отсутствует'; break;
                                case 1: rating = 'Очень слабо'; break;
                                case 2: rating = 'Слабо'; break;
                                case 3: rating = 'Средне'; break;
                                case 4: rating = 'Хорошо'; break;
                                case 5: rating = 'Отлично'; break;
                                default: rating = 'Неизвестно';
                            }
                            return context.dataset.label + ': ' + rating;
                        }
                    }
                }
            }
        }
    });
}

function initMarketTrendsChart() {
    const ctx = document.getElementById('marketTrendsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Рост мобильных покупок', 
                'Предпочтение омниканальности', 
                'Рост e-commerce товаров для дома',
                'Рост лояльности после цифровизации'
            ],
            datasets: [{
                label: '',
                data: [42, 67, 35, 82],
                backgroundColor: [
                    'rgba(13, 110, 253, 0.7)',
                    'rgba(25, 135, 84, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(13, 202, 240, 0.7)'
                ],
                borderColor: [
                    'rgba(13, 110, 253, 1)',
                    'rgba(25, 135, 84, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(13, 202, 240, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Процент (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Ключевые рыночные тренды',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}
