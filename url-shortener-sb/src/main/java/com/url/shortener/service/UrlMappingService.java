package com.url.shortener.service;

import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UrlMappingService {

    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;

    // ✅ CREATE SHORT URL
    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();

        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());

        UrlMapping saved = urlMappingRepository.save(urlMapping);
        return convertToDto(saved);
    }

    private UrlMappingDTO convertToDto(UrlMapping urlMapping){
        UrlMappingDTO dto = new UrlMappingDTO();
        dto.setId(urlMapping.getId());
        dto.setOriginalUrl(urlMapping.getOriginalUrl());
        dto.setShortUrl(urlMapping.getShortUrl());
        dto.setClickCount(urlMapping.getClickCount());
        dto.setCreatedDate(urlMapping.getCreatedDate());
        dto.setUsername(urlMapping.getUser().getUsername());
        return dto;
    }

    private String generateShortUrl() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();

        StringBuilder shortUrl = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            shortUrl.append(chars.charAt(random.nextInt(chars.length())));
        }
        return shortUrl.toString();
    }

    // ✅ GET USER URLS
    public List<UrlMappingDTO> getUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    // 🔥 MOST IMPORTANT FIX (ANALYTICS)
    public List<ClickEventDTO> getClickEventsByDate(
            String shortUrl,
            LocalDateTime start,
            LocalDateTime end
    ) {

        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);

        // ✅ FIX 1: handle invalid shortUrl
        if (urlMapping == null) {
            return new ArrayList<>();
        }

        List<ClickEvent> clicks =
                clickEventRepository.findByUrlMappingAndClickDateBetween(
                        urlMapping, start, end
                );

        // ✅ FIX 2: handle empty DB result
        if (clicks == null || clicks.isEmpty()) {
            return new ArrayList<>();
        }

        // ✅ FIX 3: group by date
        Map<LocalDate, Long> grouped = clicks.stream()
                .collect(Collectors.groupingBy(
                        click -> click.getClickDate().toLocalDate(),
                        Collectors.counting()
                ));

        // ✅ FIX 4: convert to DTO + sort
        return grouped.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    ClickEventDTO dto = new ClickEventDTO();
                    dto.setClickDate(entry.getKey());
                    dto.setCount(entry.getValue());
                    return dto;
                })
                .toList();
    }

    // ✅ TOTAL CLICKS
    public Map<LocalDate, Long> getTotalClicksByUserAndDate(
            User user,
            LocalDate start,
            LocalDate end
    ) {

        List<UrlMapping> urls = urlMappingRepository.findByUser(user);

        List<ClickEvent> clicks =
                clickEventRepository.findByUrlMappingInAndClickDateBetween(
                        urls,
                        start.atStartOfDay(),
                        end.plusDays(1).atStartOfDay()
                );

        return clicks.stream()
                .collect(Collectors.groupingBy(
                        click -> click.getClickDate().toLocalDate(),
                        Collectors.counting()
                ));
    }

    // ✅ REDIRECT
    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);

        if (urlMapping != null) {
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);

            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            clickEventRepository.save(clickEvent);
        }

        return urlMapping;
    }
}